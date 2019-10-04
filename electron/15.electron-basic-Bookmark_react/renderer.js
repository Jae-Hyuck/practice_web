const {ipcRenderer, clipboard, shell} = require('electron');
let type = 'home';
let data = [];  // 업데이트를 통해 받아올 데이터 저장용

const btnHome = document.querySelector('#btn-home');
const btnGithub = document.querySelector('#btn-github');

btnHome.classList.add('active');      // 활성표시 initialization
btnGithub.classList.remove('active');

ipcRenderer.on('update', (event, _data) => {
    data = _data;
    update();
});

btnHome.addEventListener('click', () => {
    if (type === 'home') {
        return;
    }
    btnHome.classList.add('active');      // 눌린 버튼은 활성표시 되도록 해준다.
    btnGithub.classList.remove('active');
    type = 'home';
    update();
});
btnGithub.addEventListener('click', () => {
    if (type === 'github') {
        return;
    }
    btnHome.classList.remove('active');
    btnGithub.classList.add('active');
    type = 'github';
    update();
});

function update() {
    const items = data.filter((item, index) => {
        item.removeId = index;
        return item.type === type;
    });
    const htmls = items.map(item => {
        return `
            <li class="list-group-item">
                <div class="media-body">
                    <strong><a href="#">${item.url}</a></strong>
                    <p>
                        ${item.title}
                        <span class="icon icon-trash pull-right"></span>
                    </p>
                </div>
            </li>
        `;
    })
    const html = htmls.join('');
    document.querySelector('#data').innerHTML = html;

    // 휴지통 icon 눌렀을 때 해당 목록 제거하는 콜백 등록
    const removeDoms = document.querySelectorAll('.icon-trash');
    removeDoms.forEach((removeDom, index) => {
        removeDom.addEventListener('click', () => {
            ipcRenderer.send('remove', items[index].removeId)
        });
    });

    // 하이퍼링크 눌렀을때 shell 모듈로 웹페이지 뜨도록 하는 콜백 등록
    const openDoms = document.querySelectorAll('.list-group-item a');
    openDoms.forEach(openDom => {
        openDom.addEventListener('click', (e) => {
            shell.openExternal(e.target.innerHTML);
        });
    });
}

document.addEventListener('paste', () => {
    const text = clipboard.readText();
    const item = {
        type: type,
        url: text
    }
    ipcRenderer.send('paste', item);

});