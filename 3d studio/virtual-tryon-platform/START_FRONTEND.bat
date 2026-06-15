@echo off
cd /d "%~dp0frontend"
echo.
echo  Virtual try-on frontend
echo  This PC:  http://localhost:5174/studio/
echo  (If port 5174 is busy, Vite uses the next port — use the URL Vite prints.)
echo.
echo  Phone / other PC on same WiFi: use the "Network:" line Vite prints
echo  (same port as Local), e.g. http://YOUR_LAN_IP:5174/studio/
echo  If it does not load, allow Node.js through Windows Firewall (Private networks).
echo.
call npm run sync-models
npm run dev
pause
