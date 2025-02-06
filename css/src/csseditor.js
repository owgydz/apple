// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.

const fs = require('fs');
const readline = require('readline');
const { spawnSync } = require('child_process');
const path = require('path');

function openCSSEditor() {
  const tempFile = `/tmp/apple_edit_${Date.now()}.css`;
  fs.writeFileSync(tempFile, "/* Write your CSS here */\n", "utf-8");

  const nano = spawnSync("nano", [tempFile], { stdio: "inherit" });

  if (nano.error) {
    console.error("Error opening Nano.");
    process.exit(1);
  }

  const editedCode = fs.readFileSync(tempFile, "utf-8");
  fs.unlinkSync(tempFile);

  try {
    const cssFilePath = path.join(__dirname, 'styles.css');
    fs.writeFileSync(cssFilePath, editedCode, "utf-8");
    console.log("CSS updated successfully");
  } catch (err) {
    console.error("apple:", err.message);
  }
}

module.exports = { openCSSEditor };
