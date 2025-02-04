// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License, v2.0. View in the LICENSE file. 

export async function openGoogleWindow() {
  const win = window.open('https://www.google.com', 'GoogleWindow', 'width=800,height=600');
  if (win) {
    win.focus();
  } else {
    console.error("Failed to open new window");
  }
}
