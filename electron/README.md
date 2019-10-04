#### "javascript 로 데스크탑 앱을 - 일렉트론 기초 강좌"에서 작성한 예제 코드

##### 기본적인 환경 세팅

1. npm init -y
1. npm i electron -D
1. package.json에서 scripts에 "start": "electron ." 추가

##### 참고

- package.json의 "main"이 electron의 entry point이다.
- npm으로 electron으로 설치하면, 플랫폼에 맞는 최신버전의 electron 실행 바이너리를 다운받게되는 것이다. 그리고 electron 바이너리로 지정한 node project를 실행하는 형식이다. (ex. "electron .")
- 빌드 된 프로젝트도 사실 별게 없다. 단순히 electron 바이너리와 node project가 패키징되서 함께 들어가 있을 뿐이다. 그래서 소스 보안 측면에서 불리한 편이다.
- electron의 node 버전과 개발환경의 node 버전 그다지 맞추지 않아도 상관없다. 개발환경의 node가 환경세팅하고 electron 실행하는 정도의 역할밖에 안해서....

