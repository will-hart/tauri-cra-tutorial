#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::sync::atomic::{AtomicI32, Ordering};

use tauri::State;

#[tauri::command]
fn increment_counter(state: State<AtomicI32>, delta: i32) -> Result<i32, String> {
  println!("Incrementing counter by {}", delta);
  Ok(state.fetch_add(delta, Ordering::SeqCst) + delta)
}

fn main() {
  tauri::Builder::default()
    .manage(AtomicI32::from(5))
    .invoke_handler(tauri::generate_handler![increment_counter])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
