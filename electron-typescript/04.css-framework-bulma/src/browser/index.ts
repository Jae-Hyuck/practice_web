import { app, BrowserWindow } from 'electron';
import * as firebase from 'firebase';
import * as url from 'url';
import * as path from 'path';


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
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(html);


    // 하드코딩으로 로그인해보기.
    // auth.signInWithEmailAndPassword('dkanrjsk@dkanrjsk.com', 'dkanrjsk');
});