#!/bin/bash

# use: ./shellScripts/configureProjectSymlinks.sh <projectName>
# run "sudo chmod +x shellScripts/configureProjectSymlinks.sh in case" of permission error
# must be done after adding submodule into projects/ folder

# make sure one arg provided
if [ $# -ne 1 ]; then
    echo "Error: command must have one argument: the project name."
    exit 1
fi

PROJECT=$1

# create app symlink
ln -s ../../projects/$PROJECT/app app/projects/$PROJECT

# create api symlink
ln -s ../../../projects/$PROJECT/api pages/api/projects/$PROJECT

# create public symlink
ln -s ../../projects/$PROJECT/public public/projects/$PROJECT

echo "Symlinks added"