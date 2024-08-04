tree -I > project.txt 'node_modules'

## To streamline the process of merging changes from your feature-2 branch (development) to your main branch (production), you can follow these steps each time you want to push updates

## Script for Automation

If you want to automate this process further, you can create a simple shell script. Save the following script as deploy.sh and run it every time you need to merge and push:

#!/bin/bash

1. Checkout to the main branch
    ```
    git checkout main
    ```

2. Pull the latest changes from the remote main branch

    ```
    git pull origin main
    ```

3. Merge the feature-2 branch into main

    ```
    git merge feature-2
    ```

4. Push the updated main branch to the remote repository

    ```
    git push origin main
    ```

## Make the script executable:

```
chmod +x update_main.sh
```

Then you can run the script with:

```
./update_main.sh
```

This script will perform all the necessary steps to update your main branch with changes from feature-2 and push them to the remote repository.
