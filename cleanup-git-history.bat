@echo off
echo Ex-Servicemen Association - Git History Cleanup
echo =============================================
echo.
echo This script will help clean up your git repository by:
echo 1. Removing node_modules from git tracking
echo 2. Cleaning up the commit history
echo.
echo WARNING: This will rewrite your git history!
echo Make sure you have a backup of your repository before proceeding.
echo.
pause

echo.
echo Step 1: Removing node_modules from git tracking...
git rm -r --cached node_modules
git rm -r --cached */node_modules
git rm -r --cached */*/node_modules

echo.
echo Step 2: Adding .gitignore to git...
git add .gitignore

echo.
echo Step 3: Committing the changes...
git commit -m "Clean up: Remove node_modules from tracking and add .gitignore"

echo.
echo Step 4: Cleaning up git history (this may take a while)...
echo Note: This is a simplified cleanup. For extensive history rewriting, 
echo you may need to use git filter-branch or BFG Repo-Cleaner tool.
git gc --aggressive --prune=all

echo.
echo Cleanup completed!
echo.
echo Next steps:
echo 1. Push the changes to your remote repository:
echo    git push origin main --force
echo.
echo NOTE: Using --force will overwrite the remote history.
echo Make sure other collaborators are aware of this change.
pause