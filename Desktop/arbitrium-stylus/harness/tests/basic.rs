use stylus_harness::{StylusRunner, stylus_test};

#[test]
fn test_simple_add() {
    let wasm = wat::parse_str(r#"
        (module
            (func (export "add") (param i64 i64) (result i64)
                local.get 0
                local.get 1
                i64.add)
        )
    "#).unwrap();
    
    let mut runner = StylusRunner::new(&wasm).unwrap();
    stylus_test!(runner, "add_test", "add", &[5, 3], 8);
    
    let suite = runner.finalize_suite("basic_tests");
    assert_eq!(suite.passed, 1);
    assert_eq!(suite.failed, 0);
}

#[test]
fn test_gas_profiling() {
    let wasm = wat::parse_str(r#"
        (module
            (func (export "multiply") (param i64 i64) (result i64)
                local.get 0
                local.get 1
                i64.mul)
        )
    "#).unwrap();
    
    let mut runner = StylusRunner::new(&wasm).unwrap();
    let profile = runner.profile_function("multiply", &[4, 5]).unwrap();
    
    assert_eq!(profile.function_name, "multiply");
    assert!(profile.gas_used > 0);
}