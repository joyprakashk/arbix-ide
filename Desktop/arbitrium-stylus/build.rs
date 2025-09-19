use std::process::Command;

fn main() {
    // Print build information
    println!("cargo:rerun-if-changed=build.rs");
    
    // Get git commit hash if available
    if let Ok(output) = Command::new("git")
        .args(&["rev-parse", "--short", "HEAD"])
        .output()
    {
        if output.status.success() {
            let git_hash = String::from_utf8_lossy(&output.stdout);
            println!("cargo:rustc-env=GIT_HASH={}", git_hash.trim());
        }
    }
    
    // Set build timestamp
    println!("cargo:rustc-env=BUILD_TIMESTAMP={}", chrono::Utc::now().format("%Y-%m-%d %H:%M:%S UTC"));
}