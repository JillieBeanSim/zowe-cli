#!/bin/bash
# pass the data set name as an argument to the script
zowe zos-jobs submit data-set $1
exit $?
