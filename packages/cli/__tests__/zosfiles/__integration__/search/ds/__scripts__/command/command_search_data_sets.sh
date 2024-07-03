#!/bin/bash
dsn=$1
searchterm=$2
set -e

zowe zos-files search ds "$dsn" "$searchterm" --host fakehost --pw fakepass --user fakeuser $3
if [ $? -gt 0 ]
then
    exit $?
fi