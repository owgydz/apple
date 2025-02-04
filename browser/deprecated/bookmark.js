// Copyright 2025 the Apple Authors. 
// This project is governed by the Mozilla Public License, v2.o. View in the LICENSE file. 
export function setupBookmarks() {
  const bookmarks = [];
  document.getElementById('bookmark').addEventListener('click', () => {
    const url = window.location.href;
    bookmarks.push(url);
    console.log('Bookmarked tab:', url);
  });
}
