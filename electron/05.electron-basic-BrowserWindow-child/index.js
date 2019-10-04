const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const parent = new BrowserWindow();

    setTimeout(() => {
        const child = new BrowserWindow({
            width: 300,
            height: 300,
            parent: parent,   // parent window의 child window로써 생성
            modal: true,      // child window가 닫히기 전에는 parent window 못건드리도록.

            webPreferences: {
                nodeIntegration: true,    // 이거 있어야 renderer process에서 node사용 가능.
            }
        });

        child.loadURL(`file://${__dirname}/child.html`);
    }, 3000);
});