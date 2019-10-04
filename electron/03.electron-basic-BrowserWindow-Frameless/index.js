const {app, BrowserWindow} = require('electron');

// Frame 없는 browser를 만드는 3가지 방법.
// 2번째와 3번째 방법은 mac에서만 가능하다.
app.on('ready', () => {
    console.log('ready');

    const first = new BrowserWindow({
        frame: false,  // frame 없는 browser 만듬.
    });

    first.loadURL(`file://${__dirname}/index.html`);

    const second = new BrowserWindow({
        titleBarStyle: 'hidden'
    });

    second.loadURL(`file://${__dirname}/index.html`);

    const third = new BrowserWindow({
        titleBarStyle: 'hidden-inset'
    });

    third.loadURL(`file://${__dirname}/index.html`);
});