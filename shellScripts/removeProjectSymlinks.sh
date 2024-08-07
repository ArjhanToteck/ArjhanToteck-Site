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

# remove app symlink
rm app/projects/$PROJECT

# remove api symlink
rm pages/api/projects/$PROJECT

# remove public symlink
rm public/projects/$PROJECT

echo "Symlinks deleted, note the project folder still remains in projects/"