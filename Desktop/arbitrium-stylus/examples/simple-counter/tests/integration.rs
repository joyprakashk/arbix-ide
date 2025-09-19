use stylus_harness::{StylusRunner, stylus_test};

#[test]
fn test_counter_functionality() {
    // This would normally load the built WASM file
    // For demo purposes, we'll use a simple WASM module
    let wasm = wat::parse_str(r#"
        (module
            (memory (export "memory") 1)
            (global $counter (mut i64) (i64.const 0))
            
            (func (export "increment") (result i64)
                (global.set $counter
                    (i64.add (global.get $counter) (i64.const 1)))
                (global.get $counter))
            
            (func (export "get") (result i64)
                (global.get $counter))
            
            (func (export "reset") (result i64)
                (global.set $counter (i64.const 0))
                (global.get $counter))
        )
    "#).unwrap();
    
    let mut runner = StylusRunner::new(&wasm).unwrap();
    
    // Test initial state
    stylus_test!(runner, "initial_get", "get", &[], 0);
    
    // Test increment
    stylus_test!(runner, "first_increment", "increment", &[], 1);
    stylus_test!(runner, "second_increment", "increment", &[], 2);
    
    // Test get after increments
    stylus_test!(runner, "get_after_increments", "get", &[], 2);
    
    // Test reset
    stylus_test!(runner, "reset_counter", "reset", &[], 0);
    stylus_test!(runner, "get_after_reset", "get", &[], 0);
    
    // Test gas limits
    runner.assert_gas_limit("increment_gas_test", "increment", &[], 1000);
    runner.assert_gas_limit("get_gas_test", "get", &[], 500);
    
    let suite = runner.finalize_suite("counter_integration_tests");
    
    println!("Test Results:");
    println!("Passed: {}, Failed: {}", suite.passed, suite.failed);
    println!("Total Gas Used: {}", suite.total_gas);
    
    assert_eq!(suite.passed, 8);
    assert_eq!(suite.failed, 0);
    assert!(suite.total_gas > 0);
}

#[test]
fn test_gas_profiling() {
    let wasm = wat::parse_str(r#"
        (module
            (global $counter (mut i64) (i64.const 0))
            
            (func (export "increment") (result i64)
                (global.set $counter
                    (i64.add (global.get $counter) (i64.const 1)))
                (global.get $counter))
        )
    "#).unwrap();
    
    let mut runner = StylusRunner::new(&wasm).unwrap();
    
    let profile = runner.profile_function("increment", &[]).unwrap();
    
    assert_eq!(profile.function_name, "increment");
    assert!(profile.gas_used > 0);
    assert!(profile.instruction_count > 0);
    assert_eq!(profile.call_depth, 1);
    
    println!("Gas Profile for increment:");
    println!("  Gas Used: {}", profile.gas_used);
    println!("  Instructions: {}", profile.instruction_count);
    println!("  Call Depth: {}", profile.call_depth);
}