#!/bin/bash

# Checkout to the main branch
git checkout main

# Pull the latest changes from the remote main branch
git pull origin main

# Merge the feature-2 branch into main
git merge feature-2

# Push the updated main branch to the remote repository
git push origin main

# Checkout to the feature-2 branch
git checkout feature-2