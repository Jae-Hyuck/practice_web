const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const first = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    first.loadURL(`file://${__dirname}/index.html`);

    const second = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    second.loadURL(`file://${__dirname}/index.html`);
})