INSTALLATION AND DEPLOYMENT GUIDE

STEP 1: INSTALL NODE.JS

Go to Google.
Type "Download Node.js".
Click on the first link (nodejs.org).
Click on the large green button labeled "LTS" to download.
Double-click the downloaded file.
Click "Next" multiple times to install (leave all options as default).
STEP 2: RETRIEVE THE WEBSITE

Create a new folder on your desktop named "MySite".

Open PowerShell:

Press the Windows key.
Type "PowerShell".
Click on "Windows PowerShell".
Copy and paste these commands one by one:

powershell
Copier le code
cd Desktop\MySite
git clone https://github.com/weshlokman/agencyWebsite.git
cd agencyWebsite
STEP 3: INSTALL DEPENDENCIES

In the same PowerShell window, type:
powershell
Copier le code
npm install
Wait for it to complete (this might take a few minutes).
STEP 4: START THE WEBSITE

Still in PowerShell, type:

powershell
Copier le code
npm run dev
Your browser will automatically open with the website.

If it doesn’t, open your browser and go to:
http://localhost:4321.
IF IT DOESN’T WORK:

Make sure you have installed Node.js correctly.
Close PowerShell and start again from STEP 2.
If it still doesn’t work, restart your computer and try again.