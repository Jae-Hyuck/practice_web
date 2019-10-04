const {app, BrowserWindow} = require('electron');

console.log('start');

app.on('ready', launchInfo => {
    console.log(`ready : ${JSON.stringify(launchInfo)}`);

    // 랜더러 프로세스 생성해준다.
    const mainWindow = new BrowserWindow({
        width: 600,
        heiht: 600
    });
});

// 이 event를 정의했다면, app.quit();을 explicit하게 실행시켜줘야 종료됨.
app.on('window-all-closed', () => {
    console.log('windw-all-closed');
    app.quit();
});

app.on('before-quit', event => {
    // event.preventDefault(); // 종료되지 않음
    console.log('before-quit')
});

app.on('will-quit', event => {
    // event.preventDefault(); // 종료되지 않음
    console.log('will-quit')
});

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`)
});