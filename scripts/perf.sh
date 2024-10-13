#!/bin/bash

# This script is used to run performance tests

set -o errexit -o nounset -o pipefail

function generate_onboarding() {
    __times=$1
    for i in $(seq 1 $__times); do
        echo "Generating onboarding $i"
        node dist/cli/index.js generate onboarding --data '{"name": "Bob", "services": ["svc1","svc2"]}' > /dev/null
    done
}


function generate_onboarding_bulk() {
    __bulk_size=$1
    __data_single='{"name": "Bob", "services": ["svc1","svc2"]}'
    __data='['
    for i in $(seq 1 $__bulk_size); do
        __data+=$__data_single
        if [ $i -lt $__bulk_size ]; then
            __data+=','
        fi
    done
    __data+=']'

    echo "Generating onboarding bulk with size $__bulk_size"
    # set -x # for debugging
    node dist/cli/index.js generate-bulk onboarding --data "$__data" > /dev/null
}

time generate_onboarding 10
echo
echo
time generate_onboarding_bulk 100