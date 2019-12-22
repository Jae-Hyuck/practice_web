### 실시간데이터베이스 이벤트 연결

1. Firebase 콘솔에서 Database 탭에서 Cloud Firestore말고 Realtime Database를 선택한다.
1. 규칙에서 read, write를 True로 바꿔주어야 한다.
1. general이라는 child 밑에, 여러 개의 key-value 데이터들을 넣는 방식으로 한다.
1. browser 프로세서에서, 로그인 성공하면, database관련하여 value를 read하는 이벤트 리스너 추가한다. 처음 시작할 때와, 데이터베이스가 실시간으로 변경될때 계속 반응할 수 있게 된다. (리액트로 연결하면 매우 유용할 것임.)
1. ipc 통해서 renderer 프로레스로 메시지 넘기도록 한다.
1. firebase의 message의 경우에는 object로 묶여있어서, 배열이나 dict으로 쪼개는 작업을 해주어야한다. browser프로세스에서 할 수도 있고, renderer프로세스에서 해도 되고... 그건 다음에...