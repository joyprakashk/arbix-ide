use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::path::Path;
use stylus_core::{ExecutionResult, GasProfile, StylusRuntime};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TestResult {
    pub name: String,
    pub passed: bool,
    pub execution_result: Option<ExecutionResult>,
    pub error: Option<String>,
    pub gas_profile: Option<GasProfile>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TestSuite {
    pub name: String,
    pub tests: Vec<TestResult>,
    pub total_gas: u64,
    pub passed: usize,
    pub failed: usize,
}

pub struct StylusRunner {
    runtime: StylusRuntime,
    test_results: Vec<TestResult>,
}

impl StylusRunner {
    pub fn new(wasm_bytes: &[u8]) -> Result<Self> {
        let runtime = StylusRuntime::new(wasm_bytes)?;
        Ok(Self {
            runtime,
            test_results: Vec::new(),
        })
    }

    pub fn from_file<P: AsRef<Path>>(path: P) -> Result<Self> {
        let wasm_bytes = std::fs::read(path)?;
        Self::new(&wasm_bytes)
    }

    pub fn call(&mut self, fn_name: &str, args: &[i64]) -> Result<i64> {
        let result = self.runtime.execute_function(fn_name, args)?;
        Ok(result.return_value)
    }

    pub fn test(&mut self, test_name: &str, fn_name: &str, args: &[i64], expected: i64) -> TestResult {
        match self.runtime.execute_function(fn_name, args) {
            Ok(result) => {
                let passed = result.return_value == expected;
                let gas_profile = self.runtime.profile_function(fn_name, args).ok();
                
                TestResult {
                    name: test_name.to_string(),
                    passed,
                    execution_result: Some(result),
                    error: None,
                    gas_profile,
                }
            }
            Err(e) => TestResult {
                name: test_name.to_string(),
                passed: false,
                execution_result: None,
                error: Some(e.to_string()),
                gas_profile: None,
            }
        }
    }

    pub fn assert_eq(&mut self, test_name: &str, fn_name: &str, args: &[i64], expected: i64) {
        let result = self.test(test_name, fn_name, args, expected);
        self.test_results.push(result);
    }

    pub fn assert_gas_limit(&mut self, test_name: &str, fn_name: &str, args: &[i64], max_gas: u64) {
        match self.runtime.execute_function(fn_name, args) {
            Ok(result) => {
                let passed = result.gas_used <= max_gas;
                let test_result = TestResult {
                    name: format!("{} (gas limit)", test_name),
                    passed,
                    execution_result: Some(result),
                    error: if !passed {
                        Some(format!("Gas limit exceeded: {} > {}", result.gas_used, max_gas))
                    } else {
                        None
                    },
                    gas_profile: self.runtime.profile_function(fn_name, args).ok(),
                };
                self.test_results.push(test_result);
            }
            Err(e) => {
                let test_result = TestResult {
                    name: format!("{} (gas limit)", test_name),
                    passed: false,
                    execution_result: None,
                    error: Some(e.to_string()),
                    gas_profile: None,
                };
                self.test_results.push(test_result);
            }
        }
    }

    pub fn finalize_suite(&self, suite_name: &str) -> TestSuite {
        let passed = self.test_results.iter().filter(|t| t.passed).count();
        let failed = self.test_results.len() - passed;
        let total_gas = self.test_results
            .iter()
            .filter_map(|t| t.execution_result.as_ref())
            .map(|r| r.gas_used)
            .sum();

        TestSuite {
            name: suite_name.to_string(),
            tests: self.test_results.clone(),
            total_gas,
            passed,
            failed,
        }
    }

    pub fn profile_function(&mut self, fn_name: &str, args: &[i64]) -> Result<GasProfile> {
        self.runtime.profile_function(fn_name, args)
    }
}

// Macro for easier test writing
#[macro_export]
macro_rules! stylus_test {
    ($runner:expr, $name:expr, $fn_name:expr, $args:expr, $expected:expr) => {
        $runner.assert_eq($name, $fn_name, $args, $expected);
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_runner_basic() {
        let wasm = wat::parse_str(r#"
            (module
                (func (export "add") (param i64 i64) (result i64)
                    local.get 0
                    local.get 1
                    i64.add)
            )
        "#).unwrap();
        
        let mut runner = StylusRunner::new(&wasm).unwrap();
        let result = runner.call("add", &[5, 3]).unwrap();
        assert_eq!(result, 8);
    }
}