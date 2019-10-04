const {app, BrowserWindow, shell} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    console.log(win.id);

    // shell 모듈을 main process에서 사용하는 ex.
    setTimeout(() => {
        shell.openExternal('https://www.protopie.io');
    }, 3000);

    // process 객체는 node의 process 객체로부터 상속받고 많은 정보 담고 있다.
    // main process와 renderer process 모두에서 사용 할 수 있다.
    // 일종의 전역 객체이기 때문에 따로 import 할 필요 없다.
    
    // console.log(process);  // 너무 뭐가 많이 떠서 주석처리
    console.log(process.versions);  // 라이브러리들의 version 정보
    console.log(process.platform);  // 시스템 os 종류
    console.log(process.type);  // main process에서는 'browser'라고 나오고, renderer process에서는 'renderer'라고 나온다.
});