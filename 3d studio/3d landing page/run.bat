@echo off
cd /d "%~dp0"
title 3D Landing Page - http://localhost:5173
if not exist "node_modules" (
    echo Pehli baar - npm install ho raha hai...
    call npm install
    echo.
)
echo Starting... Browser me open karein: http://localhost:5173
echo.
call npm run dev
pause
