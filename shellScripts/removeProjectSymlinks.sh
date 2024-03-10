#!/bin/bash

# use: ./shellScripts/removeProjectSymlinks.sh <projectName>
# run "sudo chmod +x shellScripts/removeProjectSymlinks.sh in case" of permission error
# does not delete project folder

# make sure one arg provided
if [ $# -ne 1 ]; then
    echo "Error: command must have one argument: the project name."
    exit 1
fi

PROJECT=$1

# create app symlink
rm app/$PROJECT

# create api symlink
rm pages/api/$PROJECT

# create public symlink
rm public/$PROJECT

echo "Symlinks deleted, note the project folder still remains in projects/"