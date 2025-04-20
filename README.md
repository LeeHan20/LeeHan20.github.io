
# Typing Competition Live (LeeHan20.github.io)

## 개요
- 실시간 영타 대회 사이트: 참가자용 페이지, 랭킹 페이지, 운영자 대시보드  
- Firebase Realtime Database 기반 실시간 채점·순위 기능

## 레포지토리 설정
1. GitHub에 `LeeHan20.github.io`라는 이름의 퍼블릭 리포지토리를 생성합니다.  
2. 이 디렉터리 구조대로 커밋·푸시합니다.  
3. **Settings → Pages**에서 **Branch: main**, **/ (root)** 선택 후 저장합니다.  
4. `https://LeeHan20.github.io`로 접속해 배포된 사이트를 확인하세요.

## Firebase 설정
1. Firebase 콘솔에서 프로젝트 생성 후 **Realtime Database** 활성화  
2. Database → Rules 탭에서 읽기·쓰기 권한(`read: true, write: true`)을 열어두거나, 필요시 보안 규칙 설정  
3. `assets/js/firebase-config.js`에 발급된 설정값을 입력

## 주요 파일
- `index.html` : 참가자 타이핑 페이지  
- `scoreboard.html` : 실시간 랭킹 조회 페이지  
- `admin.html` : 운영자 대시보드  
- `assets/css/style.css` : 공통 스타일  
- `assets/js/firebase-config.js` : Firebase SDK 설정  
- `assets/js/app.js` : 채점·순위 로직  
- `assets/images/` : 로고 및 배경 이미지
