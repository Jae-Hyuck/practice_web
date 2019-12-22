### 레이아웃 구성

1. src/browser/index.ts에서 BrowserWindow 기본 사이즈 설정.
1. 섹션 구성 - index.html에 4가지 섹션 구성 (bulma에서 필요한 것들 긁어옴), style.css에 각 섹션 스타일 구성

### 로그인, 로그아웃 처리

1. renderer 프로세스에서 click 받으면 ipc를 통해 request-login을 날리면서 id와 password 전달.
1. browser 프로레스에서는 firebase로 로그인해보고 성공하면 다시 renderer 프로세스에 login-success로 답장.
1. renderer 프로세스는 login-success를 답장 받으면 loginSection을 숨기고, chatSection과 writeSection을 보이도록 한다.
1. 로그아웃도 같은 방식으로 처리한다. (logout 버튼은 창을 옆으로 쭉 늘리면 보인다.)

