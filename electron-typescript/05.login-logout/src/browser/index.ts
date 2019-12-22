import { app, BrowserWindow, ipcMain } from 'electron';
import * as firebase from 'firebase';
import * as url from 'url';
import * as path from 'path';
import {LoginObj} from '../common/type';


const html = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, '../../static/index.html')
});


// 설정 중에 우리 프로젝트에 필요없는 건 주석처리 하였다.
firebase.initializeApp({
    apiKey: 'AIzaSyAJtXlFXzmqagvFvMkQafVO-EN7N0hgAeo',  // Auth, Genreral Use
    // authDomain: 'jaehyuck-1cc6f.firebaseapp.com',    // Auth with popup/redirect
    databaseURL: 'https://jaehyuck-1cc6f.firebaseio.com',  // Realtime Database
    projectId: 'jaehyuck-1cc6f',
    // storageBucket: 'jaehyuck-1cc6f.appspot.com',  // Storage
    // messagingSenderId: '801539791488',            // Cloud Messaging
    appId: '1:801539791488:web:e549d933af312b6ec72465',
});


// firebase는 이러한 event들로 동작한다.
const auth = firebase.auth();
auth.onAuthStateChanged((user: { email: string; }) => {
    console.log(user);
});


app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        width: 500,
        minWidth: 500,
        maxWidth: 2000,
        height: 700,
        minHeight: 700,
        maxHeight: 700,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(html);

    ipcMain.on('request-login', async (event, arg: LoginObj) => {
        console.log(arg);

        let user = null;
        try {
            user = await auth.signInWithEmailAndPassword(arg.email, arg.password);
        } catch (error) {
            console.log(error);
        }

        if (user) {
            event.sender.send('login-success');
        }
    });

    ipcMain.on('request-logout', async event => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
        event.sender.send('logout-success');
    });
});