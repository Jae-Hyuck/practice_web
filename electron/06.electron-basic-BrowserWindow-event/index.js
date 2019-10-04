const {app, BrowserWindow} = require('electron');

let win = null;  // 이전에는 'ready' callback 안에서만 쓰였는데, 이제는 밖에도 쓰이기 때문에, win을 바깥으로 뺏다.

app.on('ready', () => {
    console.log('ready');

    win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.on('ready-to-show', () => {
        console.log('ready-to-show');
        win.show();
    });

    win.on('show', () => {
        console.log('show');
    });

    // 강의의 mac환경에서는 window가 안보이도록 하면 발생하는데, windows에서는 win.hide() 호출 해줘야만 작동하는 듯.
    win.on('hide', () => {
        console.log('hide');
    });

    win.on('close', () => {
        console.log('close');
    });

    win.on('closed', () => {
        console.log('closed');
    });

    win.on('focus', () => {
        console.log('focus');
    });

    win.on('blur', () => {   // focus를 잃을 때
        console.log('blur');
    });

    win.on('move', () => {
        console.log('move');
    });
});

// mac os 전용.
// dock에 있는 거 눌렀을 때 작동... hide 된 후에 다시 살릴려고...
app.on('activate', (event, hasVisibleWindows) => {
    console.log('activate');
    if (!hasVisibleWindows) {
        win.show();
    }
});