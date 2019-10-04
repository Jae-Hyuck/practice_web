### 기본적인 환경 세팅

1. npm init -y
1. npm i electron -D
1. npm i typescript -D
1. src폴더를 만들고 그 안에 ts를 작성할것이다.
1. 컴파일된 결과물이 output폴더로 가도록 한다. (tsconfig.json 참조)
1. package.json에서 electron의 entry point인 "main"을 "output/index.js"로 지정한다.
1. package.json의 "scripts"에 기타 유용한 스크립트 작성
1. "src/index.ts"에서부터 일렉트론 entry코드 작성시작하면 된다.

### 컴파일 및 실행

1. 컴파일: tsc 직접 실행시키던지, package.json에 script만들던지, 또는 VS code에서 Ctrl+Shift+B 이용하던지...
2. 실행: package.json에 "start" script 작성해 놓았음.

### tslint 설정 (Optional)

1. npm i tslint -D  (뭐... global로 설치하는 경우도 많은 것 같은데 강의자의 성향따라...)
2. tslint.json 작성 (여기선 그냥 강사가 제공하는 것 사용)
3. VS Code의 tslint 플러그인 설치

### 참고

- tsconfig.json에서 src폴더를 따로 input으로 생략해도 상관없는 이유는? 어차피 node_modules 폴더와 outDir로 지정된 폴더는 default로 제외되고, 현재 transpile 될 수 있는 건 src 폴더 밖에 없음.