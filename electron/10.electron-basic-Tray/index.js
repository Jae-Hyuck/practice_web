const {app, BrowserWindow, Tray, Menu} = require('electron');

let win = null;
let tray = null;
const template = [
    {
        label: 'Item1'
    },
    {
        label: 'Item2',
        type: 'checkbox',
        checked: true
    },
    {
        type: 'separator'
    },
    {
        label: 'Item3',
        click: () => {
            console.log('Item3 click');
            app.quit();
        }
    }
]


app.on('ready', () => {
    console.log('ready');

    win = new BrowserWindow();

    tray = new Tray(`${__dirname}/tray16_100.png`);

    tray.on('click', () => {
        console.log('click');
    });

    // 이 이벤트는 tray에 menu가 없을 때만 발생한다.
    // 그래서 지금은 발생 안함.
    tray.on('right-click', () => {
        console.log('right-click');
    });

    const menu = Menu.buildFromTemplate(template);
    tray.setContextMenu(menu);
});