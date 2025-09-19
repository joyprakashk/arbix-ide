use anyhow::Result;
use clap::{Parser, Subcommand};
use serde_json;
use std::path::PathBuf;
use stylus_harness::{StylusRunner, TestSuite};
use tracing::{info, error};

#[derive(Parser)]
#[command(name = "stylus")]
#[command(about = "Arbitrum Stylus IDE - Development toolkit for Stylus smart contracts")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize a new Stylus project
    Init {
        #[arg(short, long)]
        name: String,
    },
    /// Build the Stylus contract
    Build {
        #[arg(short, long, default_value = ".")]
        path: PathBuf,
    },
    /// Run tests for the contract
    Test {
        #[arg(short, long, default_value = "target/wasm32-wasi/release")]
        wasm_path: PathBuf,
        #[arg(long)]
        json: bool,
    },
    /// Run a specific function
    Run {
        function: String,
        #[arg(short, long, default_value = "target/wasm32-wasi/release")]
        wasm_path: PathBuf,
        #[arg(short, long)]
        args: Vec<i64>,
    },
    /// Debug a function with step-by-step execution
    Debug {
        function: String,
        #[arg(short, long, default_value = "target/wasm32-wasi/release")]
        wasm_path: PathBuf,
        #[arg(short, long)]
        args: Vec<i64>,
    },
    /// Profile gas usage of functions
    Profile {
        function: String,
        #[arg(short, long, default_value = "target/wasm32-wasi/release")]
        wasm_path: PathBuf,
        #[arg(short, long)]
        args: Vec<i64>,
    },
    /// Setup CI configuration
    CiSetup,
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    
    let cli = Cli::parse();
    
    match cli.command {
        Commands::Init { name } => {
            init_project(&name)?;
        }
        Commands::Build { path } => {
            build_project(&path)?;
        }
        Commands::Test { wasm_path, json } => {
            run_tests(&wasm_path, json).await?;
        }
        Commands::Run { function, wasm_path, args } => {
            run_function(&function, &wasm_path, &args).await?;
        }
        Commands::Debug { function, wasm_path, args } => {
            debug_function(&function, &wasm_path, &args).await?;
        }
        Commands::Profile { function, wasm_path, args } => {
            profile_function(&function, &wasm_path, &args).await?;
        }
        Commands::CiSetup => {
            setup_ci()?;
        }
    }
    
    Ok(())
}

fn init_project(name: &str) -> Result<()> {
    info!("Initializing Stylus project: {}", name);
    
    std::fs::create_dir_all(name)?;
    std::fs::create_dir_all(format!("{}/src", name))?;
    std::fs::create_dir_all(format!("{}/tests", name))?;
    
    let cargo_toml = format!(r#"[package]
name = "{}"
version = "0.1.0"
edition = "2021"

[dependencies]
stylus-sdk = "0.4"

[lib]
crate-type = ["cdylib"]

[[bin]]
name = "main"
path = "src/main.rs"
"#, name);
    
    std::fs::write(format!("{}/Cargo.toml", name), cargo_toml)?;
    
    let lib_rs = r#"use stylus_sdk::prelude::*;

#[entrypoint]
fn user_main(input: Vec<u8>) -> Result<Vec<u8>, Vec<u8>> {
    Ok(b"Hello Stylus!".to_vec())
}
"#;
    
    std::fs::write(format!("{}/src/lib.rs", name), lib_rs)?;
    
    let stylus_config = r#"[build]
wasm_path = "target/wasm32-wasi/release"

[gas]
base_cost = 100
memory_cost = 1000
"#;
    
    std::fs::write(format!("{}/stylus.config.toml", name), stylus_config)?;
    
    info!("Project {} initialized successfully!", name);
    Ok(())
}

fn build_project(path: &PathBuf) -> Result<()> {
    info!("Building Stylus project at: {:?}", path);
    
    let output = std::process::Command::new("cargo")
        .args(&["build", "--release", "--target", "wasm32-wasi"])
        .current_dir(path)
        .output()?;
    
    if output.status.success() {
        info!("Build successful!");
        println!("{}", String::from_utf8_lossy(&output.stdout));
    } else {
        error!("Build failed!");
        eprintln!("{}", String::from_utf8_lossy(&output.stderr));
    }
    
    Ok(())
}

async fn run_tests(wasm_path: &PathBuf, json_output: bool) -> Result<()> {
    info!("Running tests for WASM at: {:?}", wasm_path);
    
    // Look for .wasm files in the directory
    let wasm_files: Vec<_> = std::fs::read_dir(wasm_path)?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.path().extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ext == "wasm")
                .unwrap_or(false)
        })
        .collect();
    
    if wasm_files.is_empty() {
        error!("No WASM files found in {:?}", wasm_path);
        return Ok(());
    }
    
    let mut all_suites = Vec::new();
    
    for wasm_file in wasm_files {
        let path = wasm_file.path();
        info!("Testing: {:?}", path);
        
        match StylusRunner::from_file(&path) {
            Ok(mut runner) => {
                // Run basic tests
                runner.assert_eq("basic_test", "user_main", &[], 0);
                
                let suite = runner.finalize_suite(&path.file_stem().unwrap().to_string_lossy());
                all_suites.push(suite);
            }
            Err(e) => {
                error!("Failed to load WASM file {:?}: {}", path, e);
            }
        }
    }
    
    if json_output {
        println!("{}", serde_json::to_string_pretty(&all_suites)?);
    } else {
        for suite in &all_suites {
            println!("\n=== Test Suite: {} ===", suite.name);
            println!("Passed: {}, Failed: {}", suite.passed, suite.failed);
            println!("Total Gas Used: {}", suite.total_gas);
            
            for test in &suite.tests {
                let status = if test.passed { "✓" } else { "✗" };
                println!("  {} {}", status, test.name);
                if let Some(error) = &test.error {
                    println!("    Error: {}", error);
                }
                if let Some(result) = &test.execution_result {
                    println!("    Gas: {}, Return: {}", result.gas_used, result.return_value);
                }
            }
        }
    }
    
    Ok(())
}

async fn run_function(function: &str, wasm_path: &PathBuf, args: &[i64]) -> Result<()> {
    info!("Running function '{}' with args: {:?}", function, args);
    
    let wasm_files: Vec<_> = std::fs::read_dir(wasm_path)?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.path().extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ext == "wasm")
                .unwrap_or(false)
        })
        .take(1)
        .collect();
    
    if let Some(wasm_file) = wasm_files.first() {
        let mut runner = StylusRunner::from_file(wasm_file.path())?;
        let result = runner.call(function, args)?;
        println!("Result: {}", result);
    } else {
        error!("No WASM files found in {:?}", wasm_path);
    }
    
    Ok(())
}

async fn debug_function(function: &str, wasm_path: &PathBuf, args: &[i64]) -> Result<()> {
    info!("Debugging function '{}' with args: {:?}", function, args);
    
    let wasm_files: Vec<_> = std::fs::read_dir(wasm_path)?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.path().extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ext == "wasm")
                .unwrap_or(false)
        })
        .take(1)
        .collect();
    
    if let Some(wasm_file) = wasm_files.first() {
        let mut runner = StylusRunner::from_file(wasm_file.path())?;
        let result = runner.call(function, args)?;
        
        println!("=== Debug Session ===");
        println!("Function: {}", function);
        println!("Arguments: {:?}", args);
        println!("Result: {}", result);
        println!("=== End Debug ===");
    } else {
        error!("No WASM files found in {:?}", wasm_path);
    }
    
    Ok(())
}

async fn profile_function(function: &str, wasm_path: &PathBuf, args: &[i64]) -> Result<()> {
    info!("Profiling function '{}' with args: {:?}", function, args);
    
    let wasm_files: Vec<_> = std::fs::read_dir(wasm_path)?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.path().extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ext == "wasm")
                .unwrap_or(false)
        })
        .take(1)
        .collect();
    
    if let Some(wasm_file) = wasm_files.first() {
        let mut runner = StylusRunner::from_file(wasm_file.path())?;
        let profile = runner.profile_function(function, args)?;
        
        println!("=== Gas Profile ===");
        println!("Function: {}", profile.function_name);
        println!("Gas Used: {}", profile.gas_used);
        println!("Instructions: {}", profile.instruction_count);
        println!("Call Depth: {}", profile.call_depth);
        println!("=== End Profile ===");
    } else {
        error!("No WASM files found in {:?}", wasm_path);
    }
    
    Ok(())
}

fn setup_ci() -> Result<()> {
    info!("Setting up CI configuration");
    
    std::fs::create_dir_all(".github/workflows")?;
    
    let ci_yml = r#"name: Stylus CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true
      - name: Add WASM target
        run: rustup target add wasm32-wasi
      - name: Build
        run: cargo build --release --target wasm32-wasi
      - name: Install Stylus CLI
        run: cargo install --path cli
      - name: Run tests
        run: stylus test --json > test-results.json
      - name: Upload test results
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results.json
"#;
    
    std::fs::write(".github/workflows/ci.yml", ci_yml)?;
    
    info!("CI configuration created at .github/workflows/ci.yml");
    Ok(())
}