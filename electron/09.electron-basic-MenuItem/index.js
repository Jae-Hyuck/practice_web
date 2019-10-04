// 이전 프로젝트에선 menu를 만들 때 template 사용.
// 여기에선 MenuItem 이용

// 이전 프로젝트에선 어플리케이션 메뉴를 사용했는데,
// 이번에는 컨텍스트 메뉴(마우스 우클릭 했을때 뜨는 메뉴)로 사용해보려고 함.

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();  // 개발자도구 자동으로 열어줌.
});