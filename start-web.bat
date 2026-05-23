@echo off
title English Scholarship Exam Trainer
color 0D

echo ============================================
echo  English Scholarship Exam Trainer
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

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found.
  echo Please install Node.js first:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo node_modules not found.
  echo Installing dependencies...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo ERROR: npm install failed.
    pause
    exit /b 1
  )
)

echo.
echo Starting local website...
echo The browser will open automatically.
echo.
echo URL: http://localhost:5173
echo.

start "" cmd /c "timeout /t 3 >nul && start http://localhost:5173"

call npm run dev

echo.
echo Server stopped.
pause
