Write-Host "Ex-Servicemen Service Foundation - Git History Cleanup" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "This script will help clean up your git repository by:" -ForegroundColor Yellow
Write-Host "1. Removing node_modules from git tracking" -ForegroundColor Yellow
Write-Host "2. Cleaning up the commit history" -ForegroundColor Yellow
Write-Host ""
Write-Host "WARNING: This will rewrite your git history!" -ForegroundColor Red
Write-Host "Make sure you have a backup of your repository before proceeding." -ForegroundColor Red
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Step 1: Removing node_modules from git tracking..." -ForegroundColor Cyan
git rm -r --cached node_modules 2>$null
git rm -r --cached */node_modules 2>$null
git rm -r --cached */*/node_modules 2>$null

Write-Host ""
Write-Host "Step 2: Adding .gitignore to git..." -ForegroundColor Cyan
git add .gitignore

Write-Host ""
Write-Host "Step 3: Committing the changes..." -ForegroundColor Cyan
git commit -m "Clean up: Remove node_modules from tracking and add .gitignore"

Write-Host ""
Write-Host "Step 4: Cleaning up git history (this may take a while)..." -ForegroundColor Cyan
Write-Host "Note: This is a simplified cleanup. For extensive history rewriting," -ForegroundColor Yellow
Write-Host "you may need to use git filter-branch or BFG Repo-Cleaner tool." -ForegroundColor Yellow
git gc --aggressive --prune=all

Write-Host ""
Write-Host "Cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Push the changes to your remote repository:" -ForegroundColor Yellow
Write-Host "   git push origin main --force" -ForegroundColor Yellow
Write-Host ""
Write-Host "NOTE: Using --force will overwrite the remote history." -ForegroundColor Red
Write-Host "Make sure other collaborators are aware of this change." -ForegroundColor Red
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")