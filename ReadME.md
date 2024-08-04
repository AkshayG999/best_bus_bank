tree -I > project.txt 'node_modules'

## To streamline the process of merging changes from your feature-2 branch (development) to your main branch (production), you can follow these steps each time you want to push updates

Steps:
Switch to the main branch:

sh
git checkout main
Pull the latest changes from the remote main branch to ensure your local main branch is up to date:

sh
git pull origin main
Merge the feature-2 branch into the main branch:

sh
git merge feature-2
If there are conflicts, resolve them, then continue with the merge.
Push the updated main branch to the remote repository:

sh
git push origin main
This sequence of commands ensures that your main branch is always up to date with the latest changes from your feature-2 branch, and it handles any potential conflicts during the merge process.

## Script for Automation

If you want to automate this process further, you can create a simple shell script. Save the following script as deploy.sh and run it every time you need to merge and push:

sh
#!/bin/bash

# Checkout to the main branch

git checkout main

# Pull the latest changes from the remote main branch

git pull origin main

# Merge the feature-2 branch into main

git merge feature-2

# Push the updated main branch to the remote repository

git push origin main
Make the script executable:

sh
chmod +x deploy.sh

Then you can run the script with:

sh
./deploy.sh

This script will perform all the necessary steps to update your main branch with changes from feature-2 and push them to the remote repository.
