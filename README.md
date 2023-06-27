# Board Project with NestJS

## 설치 방법
- 요청하신 서버 동작에 필요한 몇몇 package는 종속성 오류로 lastest 버전의 package를 받았으니 참고 부탁드리며, 
- 필요할 경우 package.json에서 버전 수정 부탁드립니다.
- .env는 원래 .gitignore에 포함시키나 test를 위해 포함 시켰습니다.

1. 파일 압축 해제 후 npm install 명령어로 필요한 패키지를 다운받습니다.
2. mysql에서 서버 연동을 위해 board_development 이름의 schema를 생성합니다.
3. npm run start:dev 명령어를 통해 dev 환경에서의 db를 사용하여 서버를 실행시킵니다.
4. prod 환경에서 동작할 경우,
  - src/configs/database.config.ts 에서 production 옵션을 필요에 따라 수정시킵니다.
  - npm build를 통해 prod 환경에서 서버를 실행하기 위한 compile을 수행합니다.
  - npm start:prod 명령어를 통해 prod환경의 db를 사용하여 실행합니다.

