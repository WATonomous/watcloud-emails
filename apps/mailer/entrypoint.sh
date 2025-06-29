#!/bin/sh

__port=${PORT:?Missing PORT environment variable}

npm start -- --port $__port &

echo "Waiting for server to start on port $__port..."
sleep 2

echo "Specializing..."
__res=$(curl --silent -X POST -H "Content-Type: application/json" -d @"/state.json" http://localhost:$__port/v2/specialize -w "\n%{http_code}\n")
__code=$(echo "$__res" | tail -n 1)
__body=$(echo "$__res" | head -n -1)

if [ "$__code" = "202" ]; then
    echo "Successfully specialized on port $__port with config $(cat /state.json)"
else
    echo "Failed to specialize with code '$__code' and body:"
    echo "$__body"
    exit 1
fi

wait
