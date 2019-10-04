const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
    });

    mainWindow.loadURL('https://github.com')

    const secondWindow = new BrowserWindow({
        width: 300,
        height: 300,
        x: 0,  // 화면에 뜨는 browser의 위치
        y: 0,
        minwidth: 200,  // browser의 최소 최대 크기
        minHeight: 200,
        maxWidth: 500,
        maxHeight: 500,
        movable: false,  // browser 움직일 수 있는지 여부
        title: 'second',  // browser title
    });

    secondWindow.loadURL(`file://${__dirname}/second.html`)
});