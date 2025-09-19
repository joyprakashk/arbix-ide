use stylus_sdk::prelude::*;

static mut COUNTER: u64 = 0;

#[entrypoint]
fn user_main(input: Vec<u8>) -> Result<Vec<u8>, Vec<u8>> {
    let function = String::from_utf8(input).map_err(|_| b"Invalid input".to_vec())?;
    
    match function.as_str() {
        "increment" => {
            unsafe {
                COUNTER += 1;
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        "get" => {
            unsafe {
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        "reset" => {
            unsafe {
                COUNTER = 0;
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        _ => Err(b"Unknown function".to_vec())
    }
}

#[export_name = "increment"]
pub extern "C" fn increment() -> i64 {
    unsafe {
        COUNTER += 1;
        COUNTER as i64
    }
}

#[export_name = "get"]
pub extern "C" fn get() -> i64 {
    unsafe { COUNTER as i64 }
}

#[export_name = "reset"]
pub extern "C" fn reset() -> i64 {
    unsafe {
        COUNTER = 0;
        COUNTER as i64
    }
}