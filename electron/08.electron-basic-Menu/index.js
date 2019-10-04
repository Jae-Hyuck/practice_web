const {app, BrowserWindow, Menu} = require('electron');

const template = [
    {
        label: 'First',
        submenu: [
            {
                label: 'First-sub1',
                click: () => {
                    console.log('First-sub1 click');
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Second',
        submenu: [
            {
                label: 'Second-sub1'
            },
            {
                label: 'Second-sub2'
            },
            {
                type: 'separator'  // 구분선
            },
            {
                label: 'Second-sub3',
                click() {          // 위에 처럼 익명함수 써도 되고, 이런식으로 써도 되고...
                    console.log('Second-sub3');
                }
            }
        ]
    }
];

app.on('ready', () => {
    console.log('ready');

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    console.log(Menu.getApplicationMenu());  // 걍 display 해봄.

    const win = new BrowserWindow();
});