const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();
});