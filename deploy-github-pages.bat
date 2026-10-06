@echo off
title Deploy English Scholarship Exam Trainer
color 0D

echo ============================================
echo  Deploy English Scholarship Exam Trainer
echo ============================================
echo.

cd /d "%~dp0"

if not exist package.json (
  echo ERROR: package.json not found.
  echo Please put this file inside the project root folder.
  echo.
  pause
  exit /b 1
)

where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: git was not found.
  echo Please install Git first:
  echo https://git-scm.com/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found.
  echo Please install Node.js first:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo Installing dependencies from package-lock...
call npm install
if errorlevel 1 (
  echo.
  echo ERROR: npm install failed.
  pause
  exit /b 1
)

echo.
echo Running build and validations...
call npm run build
if errorlevel 1 goto failed

call npm run validate
if errorlevel 1 goto failed

call npm run lint
if errorlevel 1 goto failed

echo.
echo Git status:
git status --short

echo.
echo Adding safe project files only...
git add -A .github docs public scripts src .gitignore eslint.config.js index.html package.json package-lock.json README.md start-web.bat vite.config.js deploy-github-pages.bat english-scholarship-trainer.code-workspace

git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Prepare GitHub Pages deployment"
) else (
  echo No staged changes to commit.
)

echo.
echo Pushing to origin main...
git push -u origin main
if errorlevel 1 goto failed

echo.
echo Done. GitHub Actions will deploy:
echo https://kawinthorn11-collab.github.io/english-scholarship-trainer/
pause
exit /b 0

:failed
echo.
echo ERROR: Deployment helper stopped because a command failed.
pause
exit /b 1
