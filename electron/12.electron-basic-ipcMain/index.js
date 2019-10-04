const {app, BrowserWindow, ipcMain} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    // 비동기 메세지 수신 후 답장
    ipcMain.on('send_async_channel', (event, message) => {
        console.log(message);
        event.sender.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
        // win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');  // 바로 윗줄과 똑같은 역할 // 하지만 reply 역할을 위해선 윗줄 처럼 하는게 더 자연스럽겠다. // 대신 reply가 아닌, async 메시지를 보낼 때 사용하면 된다.
    });

    // 동기 메세지 수신 후 답장
    ipcMain.on('send_sync_channel', (event, message) => {
        console.log(message);
        event.returnValue = '이것은 메인프로세스에서 보낸 동기 대답입니다.';
    });

    // 비동기 메세지 발송
    setInterval(() => {
        win.webContents.send('reply_async_channel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
    }, 3000)
})