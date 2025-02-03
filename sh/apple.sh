# Copyright 2025 the Apple authors.
# This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.
# To make this script work, run `chmod +x apple/sh/apple.sh`.
# Then add it to your PATH.

# Note that you can run the Apple command flags with this file.

#!/bin/bash
APPLE_DIR="$HOME/apple"

# check as a fallback
if [ ! -d "$APPLE_DIR" ]; then
    APPLE_DIR="/root/apple"
fi

# run the thing
node "$APPLE_DIR/js/apprepl.js" "$@"
