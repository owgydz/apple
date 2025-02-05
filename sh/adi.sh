# Copyright 2025 the Apple authors.
# This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file. 
# To make this script executable, run `chmod +x apple/sh/adi.sh"`.
#!/bin/bash

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

if ! command_exists node; then
  echo "PROCESS: Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "INFO: Since Node.js is already installed, skipping step"
fi

if ! command_exists npm; then
  echo "PROCESS: Installing npm..."
  sudo apt-get install -y npm
else
  echo "INFO: Since npm is already installed, skipping step"
fi

echo "Installing apple deps. Please wait."
npm install htmlparser2
npm install node-fetch

echo "All dependencies have been installed. Done."
echo "Running adi (Apple Dependencies Installer) v0.11.9
