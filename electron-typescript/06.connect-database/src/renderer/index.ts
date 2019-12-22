import { ipcRenderer } from 'electron';
import {LoginObj} from '../common/type';



function main() {
    const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;
    const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

    btnLogin.addEventListener('click', () => {
        console.log('#btn-login click');

        const input_email = document.querySelector('#email') as HTMLInputElement;
        const input_password = document.querySelector('#password') as HTMLInputElement;

        const email = input_email.value;
        const password = input_password.value;

        const loginObj: LoginObj = {
            email,
            password
        };

        ipcRenderer.send('request-login', loginObj);
    });

    btnLogout.addEventListener('click', () => {
        ipcRenderer.send('request-logout');
    });

    const loginSection = document.querySelector('#login-section') as HTMLDivElement;
    const chatSection = document.querySelector('#chat-section') as HTMLDivElement;
    const writeSection = document.querySelector('#write-section') as HTMLDivElement;

    ipcRenderer.on('login-success', () => {
        console.log('login-success');

        loginSection.style.display = 'none';
        chatSection.style.display = 'block';
        writeSection.style.display = 'block';
    });

    ipcRenderer.on('logout-success', () => {
        console.log('logout-success');

        loginSection.style.display = 'block';
        chatSection.style.display = 'none';
        writeSection.style.display = 'none';
    });

    ipcRenderer.on('general-message', (event, arg) => {
        console.log(arg);
    });
}

document.addEventListener('DOMContentLoaded', main);