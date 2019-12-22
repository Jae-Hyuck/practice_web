### 이전 프로젝트 가져와서 할 일

1. firebase 프로젝트 생성
1. firebase 콘솔의 Authentication 탭의 로그인 방법에서 이메일/비밀번호 사용 설정하고, 사용자에서 이메일/비밀번호 하나 추가.
1. firebase 콘솔의 Database 탭에서 Database 하나 추가.
1. npm i firebase -S
1. firebase 콘솔의 Overview에서 웹 앱을 위한 code snippet 중에서 일부를 복사해서, index.js에 firebase를 초기화하는데 사용한다.
1. 에러가 발생하면 npm rebuild --target=7.1.7 --runtime=electron --dist-url=https://atom.io/download/electron 를 실행시킨다.  (https://stackoverflow.com/questions/52156883/error-with-firebase-on-electron-app-failed-to-load-grpc) (https://www.npmjs.com/package/grpc#about-electron)

### 참고: 단일 파이어베이스 프로젝트 사용시 initialize

전역에서 불러올 수 있음.... 

```typescript
import * as firebase from 'firebase';

// firebase.initializeApp 의 두번째 인자를 사용하지 않음.
const defaultApp: firebase.app.App = firebase.initializeApp(defaultAppConfig);

console.log(defaultApp.name);  // "[DEFAULT]"
console.log(firebase.app().name); // "[DEFAULT]"

// 이렇게 사용하거나,
const auth = defaultApp.auth();
const database = defaultApp.database();

// 혹은 이렇게도 사용이 가능하다.
const auth = firebase.auth();
const database = firebase.database();
```

### 참고: 멀티 파이어베이스 프로젝트 사용시 initialize

```typescript
import * as firebase from 'firebase';

// [DEFAULT] 를 셋팅시에는 firebase.initializeApp 의 두번째 인자를 사용하지 않음.
firebase.initializeApp(defaultAppConfig);

// 다른 파이어베이스 프로젝트의 설정을 셋팅시에는, 두번째 인자에 이름을 넣는다.
const otherApp: firebase.app.App = firebase.initializeApp(otherAppConfig, "other");

console.log(firebase.app().name); // "[DEFAULT]"
console.log(otherApp.name); // "other"

// [DEFAULT] 프로젝트의 서비스를 사용할때는
const auth = firebase.auth();
const database = firebase.database();

// other 프로젝트의 서비스를 사용할때는
const otherDatabase = otherApp.database();
```