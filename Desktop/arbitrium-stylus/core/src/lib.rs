use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasmer::{imports, Function, Instance, Module, Store, Value};
use wasmer_wasi::{WasiState, WasiEnv};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExecutionResult {
    pub return_value: i64,
    pub gas_used: u64,
    pub call_trace: Vec<String>,
    pub memory_usage: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GasProfile {
    pub function_name: String,
    pub gas_used: u64,
    pub instruction_count: u64,
    pub call_depth: u32,
}

pub struct StylusRuntime {
    store: Store,
    module: Module,
    gas_table: HashMap<String, u64>,
    instrumentation_enabled: bool,
}

impl StylusRuntime {
    pub fn new(wasm_bytes: &[u8]) -> Result<Self> {
        let store = Store::default();
        let module = Module::new(&store, wasm_bytes)
            .map_err(|e| anyhow!("Failed to create module: {}", e))?;
        
        let mut gas_table = HashMap::new();
        gas_table.insert("call".to_string(), 100);
        gas_table.insert("memory_grow".to_string(), 1000);
        gas_table.insert("local_get".to_string(), 1);
        gas_table.insert("local_set".to_string(), 1);
        
        Ok(Self {
            store,
            module,
            gas_table,
            instrumentation_enabled: true,
        })
    }

    pub fn execute_function(&mut self, fn_name: &str, args: &[i64]) -> Result<ExecutionResult> {
        let wasi_env = WasiState::new("stylus-runtime").finalize(&mut self.store)?;
        let import_object = wasi_env.import_object(&mut self.store, &self.module)?;
        
        let instance = Instance::new(&mut self.store, &self.module, &import_object)?;
        
        let func = instance.exports.get_function(fn_name)
            .map_err(|_| anyhow!("Function '{}' not found", fn_name))?;
        
        let values: Vec<Value> = args.iter().map(|&a| Value::I64(a)).collect();
        
        let start_gas = 0u64;
        let mut call_trace = Vec::new();
        
        if self.instrumentation_enabled {
            call_trace.push(format!("Calling function: {}", fn_name));
        }
        
        let result = func.call(&mut self.store, &values)
            .map_err(|e| anyhow!("Function execution failed: {}", e))?;
        
        let return_value = match result.get(0) {
            Some(Value::I64(val)) => *val,
            Some(Value::I32(val)) => *val as i64,
            _ => 0,
        };
        
        let gas_used = self.estimate_gas(fn_name, args.len());
        
        Ok(ExecutionResult {
            return_value,
            gas_used,
            call_trace,
            memory_usage: 1024, // Simplified
        })
    }

    pub fn profile_function(&mut self, fn_name: &str, args: &[i64]) -> Result<GasProfile> {
        let result = self.execute_function(fn_name, args)?;
        
        Ok(GasProfile {
            function_name: fn_name.to_string(),
            gas_used: result.gas_used,
            instruction_count: result.gas_used / 10, // Simplified mapping
            call_depth: 1,
        })
    }

    fn estimate_gas(&self, fn_name: &str, arg_count: usize) -> u64 {
        let base_gas = self.gas_table.get("call").unwrap_or(&100);
        base_gas + (arg_count as u64 * 10)
    }

    pub fn enable_instrumentation(&mut self, enabled: bool) {
        self.instrumentation_enabled = enabled;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_runtime_creation() {
        let wasm = wat::parse_str(r#"
            (module
                (func (export "add") (param i64 i64) (result i64)
                    local.get 0
                    local.get 1
                    i64.add)
            )
        "#).unwrap();
        
        let runtime = StylusRuntime::new(&wasm);
        assert!(runtime.is_ok());
    }
}