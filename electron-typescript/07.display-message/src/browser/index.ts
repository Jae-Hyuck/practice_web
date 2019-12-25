import { app, BrowserWindow, ipcMain } from 'electron';
import * as firebase from 'firebase';
import * as url from 'url';
import * as path from 'path';
import { LoginObjType, MessageObjectType } from '../common/type';


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


const auth = firebase.auth();
const database = firebase.database();

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

    ipcMain.on('request-login', async (event, arg: LoginObjType) => {
        console.log(arg);

        let user = null;
        try {
            user = await auth.signInWithEmailAndPassword(arg.email, arg.password);
        } catch (error) {
            console.log(error);
        }

        if (user) {
            event.sender.send('login-success');
            const ref = database.ref();
            ref.child('general').on('value', snapshot => {
                if (snapshot) {
                    const data = snapshot.val();

                    const messageObjects: MessageObjectType[] = Object.keys(data).map(id => {
                        const messageObject: MessageObjectType = {
                            id,
                            email: data[id].email,
                            name: data[id].name,
                            message: data[id].message,
                            time: data[id].time
                        };
                        return messageObject;
                    });

                    event.sender.send('general-message', messageObjects);
                }
            }, function (error) {
                console.error(error);
            });
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

    ipcMain.on('send-message', event => {
        if (auth.currentUser) {
            const ref = database.ref();
            ref.child('general').push().set({
                email: '이메일 주소',
                name: '이름',
                message: '메세지',
                time: '시간'
            });
        }
    });
});