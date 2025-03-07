# Copyright 2025 the Apple authors.
# This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.
# To make this script work, run `chmod +x apple/sh/apple.sh`.
# Then add it to your PATH.

# Note that you can run the Apple command flags with this file.

#!/bin/bash
APPLE_DIR="$HOME/apple"

# Linux only*
# Check as a fall back incase if the user added the file into their /root directory. 
# If so, run from there.
if [ ! -d "$APPLE_DIR" ]; then
    APPLE_DIR="/root/apple"
fi

# Now check if it's located in the git clone directory.
# If so, run the node command in the correct directory.
node "$APPLE_DIR/js/apprepl.js" "$@"
