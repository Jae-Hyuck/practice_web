const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, clipboard } = require('electron');
const request = require('superagent');  // url로 부터 컨텐츠 가져올때 사용.
const getTitle = require('get-title');  // html 컨텐츠에서 title 얻어낼 때 사용.
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, './data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH).toString());

let win = null;
let tray = null;

// Tray 우클릭시 보일 메뉴
const template = [
    {
        label: 'Open',
        click: () => {
            win.show();
        }
    },
    {
        label: 'Save',
        submenu: [
            {
                label: 'Home',
                click: () => {
                    const item = {
                        type: 'home',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            },
            {
                label: 'Github',
                click: () => {
                    const item = {
                        type: 'github',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        label: 'Quit',
        click: () => {
            app.quit();
        }
    }
]

// 패키지화 하면 paste가 안먹혀서 새로 menu 만들어준다고 하는데, windows에서는 그런 현상 없어서 pass.
/* 
const context = [
    {
        label: app.getName(),
        submenu: [
            {role: 'paste'},
            {type: 'separator'},
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]

    }
];
*/

app.on('ready', () => {
    // Menu.setApplicationMenu(Menu.buildFromTemplate(context));
    const menu = Menu.buildFromTemplate(template);
    tray = new Tray(path.join(__dirname, './icon_white.png'));
    tray.setContextMenu(menu);
    
    // platform마다 다른 행동의 경우 아래와 같이 처리하면 되는데, windows에서만 돌릴꺼라서, 그냥 한가지만 해놓았음.
    if (process.platform === 'win32') {
        tray.on('click', () => {  // tray 좌클릭은 window 보였다가 숨겼다가...
            toggle();
        });
    } else if (process.patform ==='darwin') {
        tray.on('right-click', () => {
            toggle();
        });
    }
    const bounds = tray.getBounds(); // tray 위치
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 400,
        height: 400,
        x: Math.round(bounds.x + (bounds.width / 2) - 200),
        y: 100,
        acceptFirstMouse: true,  // photonkit 기본설정 follow
        frame: false,  // photonkit 기본설정 follow
        show: false, // ready-to-show event 사용하기 위해서
        resizable: false,
        movable: false,
    });
    win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/index.html`);
    win.once('ready-to-show', () => {
        // win.show();  // 시작 시에 window 자동으로 display 되지 않도록, 대신 tray에서 실행.
        win.webContents.send('update', data);
    });

    ipcMain.on('paste', (event, item) => {
        save(item);
    });

    ipcMain.on('remove', (event, removeId) => {
        data.splice(removeId, 1);
        fs.writeFileSync(DATA_PATH, JSON.stringify(data));
        win.webContents.send('update', data);
    });
});

function toggle() {
    if (win.isVisible()) {
        win.hide();
    } else {
        win.show();
    }
}

function save(item) {
    if (item.url.indexOf('http://') > -1 || item.url.indexOf('https://') > -1) {  // 유효한 url이라면, 컨텐츠에서 title을 뽑아내서, data를 업데이트한다.
        const type = item.type;
        const url = item.url;
        request.get(url).end((err, response) => {
            const contents = response.res.text;
            getTitle(contents).then(title => {
                data.push({ type, url, title });
                fs.writeFileSync(DATA_PATH, JSON.stringify(data));
                win.webContents.send('update', data);
            });
        });
    } else {
        dialog.showErrorBox('경고', '유효한 url이 아닙니다.');
    }
}