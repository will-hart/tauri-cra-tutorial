#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::collections::HashMap;

use tauri::{async_runtime::RwLock, State};

type InnerState = RwLock<HashMap<i32, i32>>;

#[tauri::command]
async fn increment_counter(
  state: State<'_, InnerState>,
  id: i32,
  delta: i32,
) -> Result<i32, String> {
  println!("Incrementing counter {} by {}", id, delta);

  let mut hashmap = state.write().await;
  let next_value = *hashmap.get(&id).unwrap_or(&0) + delta;
  hashmap.insert(id, next_value);

  Ok(next_value)
}

#[tauri::command]
async fn get_counter(state: State<'_, InnerState>, id: i32) -> Result<i32, String> {
  println!("Getting counter value for counter {}", id);

  let hashmap = state.read().await;
  Ok(*hashmap.get(&id).unwrap_or(&0))
}

fn main() {
  tauri::Builder::default()
    .manage(RwLock::new(HashMap::<i32, i32>::new()))
    .invoke_handler(tauri::generate_handler![increment_counter, get_counter])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
