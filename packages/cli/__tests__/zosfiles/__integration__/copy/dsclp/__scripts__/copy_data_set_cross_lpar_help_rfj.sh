#!/bin/bash
set -e

echo "================Z/OS FILES COPY DATA SET CROSS LPAR HELP==============="
zowe zos-files copy dsclp --help --rfj
if [ $? -gt 0 ]
then
    exit $?
fi