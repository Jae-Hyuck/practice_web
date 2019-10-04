const {app, BrowserWindow} = require('electron');

// 브라우저를 먼저 띄우고 컨텐츠를 천천히 로딩하면 보기 안좋으므로,
// 컨텐츠가 준비되면 브라우저를 띄움과 동시에 컨텐츠를 디스플레이하는 방법.
app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        width: 600,
        height: 600,
        show: false,
    });

    win.loadURL('https://github.com');

    win.once('ready-to-show', () => {
        win.show();
    });
});