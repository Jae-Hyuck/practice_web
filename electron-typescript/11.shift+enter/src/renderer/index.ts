import { ipcRenderer, remote } from 'electron';
import { LoginObjType, MessageObjectType } from '../common/type';

const { dialog } = remote;

function main() {
    const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;
    const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

    const input_email = document.querySelector('#email') as HTMLInputElement;
    const input_password = document.querySelector('#password') as HTMLInputElement;

    btnLogin.addEventListener('click', () => {
        console.log('#btn-login click');

        // 1. 이메일 규칙
        if (input_email.value.length < 4 || !validateEmail(input_email.value)) {
            const win = remote.getCurrentWindow();
            dialog.showMessageBoxSync(win, {
                message: 'Login Failed',
                detail: '이메일 아닌듯'
            });
            input_email.focus();
            return;
        }

        // 2. 패스워드 문자열 길이
        if (input_password.value.length < 4) {
            const win = remote.getCurrentWindow();
            dialog.showMessageBoxSync(win, {
                message: 'Login Failed',
                detail: '패스워드가 짧은듯'
            });
            input_password.focus();
            return;
        }

        const loginObj: LoginObjType = {
            email: input_email.value,
            password: input_password.value
        };

        ipcRenderer.send('request-login', loginObj);
    });

    btnLogout.addEventListener('click', () => {
        ipcRenderer.send('#btn-logout click');

        input_email.value = '';
        input_password.value = '';

        ipcRenderer.send('request-logout');
    });

    const loginSection = document.querySelector('#login-section') as HTMLDivElement;
    const chatSection = document.querySelector('#chat-section') as HTMLDivElement;
    const writeSection = document.querySelector('#write-section') as HTMLDivElement;

    const btnToggle = document.querySelector('#btn-toggle') as HTMLSpanElement;
    const navMenu = document.querySelector(`#${btnToggle.dataset.target}`) as HTMLDivElement;

    btnToggle.addEventListener('click', () => {
        btnToggle.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
    });

    ipcRenderer.on('login-success', () => {
        console.log('login-success');

        loginSection.style.display = 'none';
        chatSection.style.display = 'block';
        writeSection.style.display = 'block';

        btnToggle.style.display = 'block';
    });

    ipcRenderer.on('login-error', (event, code: string) => {
        console.log('receive : login-error');

        if (code === 'auth/user-not-found') {
            const win = remote.getCurrentWindow();
            dialog.showMessageBoxSync(win, {
                message: 'Login Failed',
                detail: '없는 이메일인듯'
            });
            input_email.focus();
        } else if (code === 'auth/wrong-password') {
            const win = remote.getCurrentWindow();
            dialog.showMessageBoxSync(win, {
                message: 'Login Failed',
                detail: '패스워드가 틀린듯'
            });
            input_password.focus();
        }
    });

    ipcRenderer.on('logout-success', () => {
        console.log('logout-success');

        loginSection.style.display = 'block';
        chatSection.style.display = 'none';
        writeSection.style.display = 'none';

        btnToggle.style.display = 'none';
        btnToggle.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
    });

    ipcRenderer.on('general-message', (event, messageObjects: MessageObjectType[]) => {
        console.log('receive : general-message');
        const messageHTML = messageObjects.map(messageObject => {
            return `
<div class="box">
    <article class="media">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>${messageObject.name}</strong> <small>${messageObject.email}</small> <small>${messageObject.time}</small>
                    <br>
                    ${messageObject.message}
                </p>
            </div>
        </div>
    </article>
</div>
            `;
        }).join('');
        const messageContainer = document.querySelector('#message-container') as HTMLDivElement;
        messageContainer.innerHTML = messageHTML;
    });

    const btnSendMessage = document.querySelector('#btn-send-message') as HTMLButtonElement;
    const messageDom = document.querySelector('#message') as HTMLTextAreaElement;

    btnSendMessage.addEventListener('click', () => {
        console.log('#btn-send-message click');

        const message = messageDom.value;

        if (message === '') {
            return;
        }

        ipcRenderer.send('send-message', message);
        messageDom.value = '';
    });

    // Shit+Enter로 메시지 보내기
    messageDom.addEventListener('keypress', event => {
        if (event.shiftKey && event.keyCode === 13) {
            event.preventDefault();
            const message = messageDom.value;
            if (message === '') {
                return;
            }
            ipcRenderer.send('send-message', message);
            messageDom.value = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', main);

function validateEmail(email) {
    const re = /\S+@\S+\.\S\S+/;
    return re.test(email);
}