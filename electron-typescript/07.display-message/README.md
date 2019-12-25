### 일렉트론에서 파이어베이스 데이터베이스로 데이터 보내기

#### 파이어베이스 쓰기 방식

- database의 reference를 얻고, 쓰기할 위치로 이동한다.
    - database.ref().child('general')
- 그 위치에 오브젝트를 입력하기 위한 프로퍼티를 생성한다.
    - database.ref().child('general').push()
- 그 프로퍼티에 객체를 만들어서 붙인다.
    - push().set(오브젝트)

#### 무작정 보내기

- send버튼 누르면, renderer 프로세스에서 ipc 통해 browser 프로세스로 알려주고, browser 프로세스에서는 dummy 메시지를 데이터베이스에 쓰는 코드 작성

#### 랜더러에서 데이터 뿌리기

- MessageObjectType을 정의하고, browser 프로세스 내의 데이터베이스 변화를 감지하는 이벤트 핸들러에서, MessageObjectType의 array로 풀어낸 후에 renderer 프로세스에 전송한다.
- rendere 프로세스에서는 받은 메시지를 html로 뿌린다.



