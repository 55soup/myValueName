# 💚(v-v) various-variable
### ChatGPT가 지어주는 변수명 - (학교 DBP과목 프로젝트)
### [🔗기획서 보러가기](https://www.canva.com/design/DAFqRk2m3H8/adpLgxOymJV18aViM0C78g/view?utm_content=DAFqRk2m3H8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=Oracle&logoColor=white">
  <img src="https://img.shields.io/badge/AmazonRDS-527fff?style=for-the-badge&logo=Amazon RDS&logoColor=white">
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=OpenAI&logoColor=white">
</div>

<br />
<br />
<br />
<br />

## 🛠기능
### 🔒회원가입
- 📌사용 SQL문
```SQL
INSERT INTO "USERS" (NICKNAME, EMAIL, JOIN_DATE, PASSWORD) VALUES (:nickname, :email, :join_date, :password)
```
- __비밀번호 확인과 일치 하지 않으면 회원가입이 되지 않습니다.__

![image](https://github.com/55soup/various-variable-name/assets/86298664/209d1daf-5198-4d77-9ad0-d08597c16690)

<br />
<br />

### 🔑로그인
- 📌사용 SQL문
```SQL
SELECT EMAIL, PASSWORD FROM USERS WHERE TRIM(EMAIL)=:EMAIL
```
- **이메일로 사용자가 존재하는지 확인**합니다.
- __사용자가 없거나, 비밀번호가 일치하지 않으면 로그인 되지 않습니다.__
- 로그인 후 __쿠키에 USER_ID가 저장__됩니다.

![image](https://github.com/55soup/various-variable-name/assets/86298664/e1321233-0c87-479b-b676-67abbfcef6b6)

<br />
<br />

### 🎤speech-to-text ChatGPT에게 질문
- __ChatGPT에게 말로 질문을 할 수 있습니다.__
- ChatGPT는 __openAI 패키지__를 활용하여 프롬프트를 작성하였습니다.

프롬프트 내용의 예시는 다음과 같습니다.
```javascript
Variable: 햄버거 타이쿤 게임에서 요리사 캐릭터 객체를 만들건데, 카멜케이스로 변수 이름 추천해줘.
  Names: chatName, burgerSpecialist, HambugerShaf
Variable: 옷입히기 캐릭터의 오브젝트 변수 이름을 스네일케이스로 추천해줘
  Names: character_outfit, clothing_items, dress_up_object
```

![image](https://github.com/55soup/various-variable-name/assets/86298664/762b4478-6626-4886-9ced-38bf6543e0ca)

<br />
<br />

### 🖨ChatGPT 답변 CRUD
📌사용 SQL문
- Create
```SQL
  INSERT INTO "GPT_QUESTIONS" (USER_ID, CONTENT, ANSWER, DATES) VALUES (:user_id, :content, :answer, :dates)
```
- Read
```SQL
  SELECT * FROM "GPT_QUESTIONS" ORDER BY q_id; WHERE usere_id=:user_id
```
- Update
```SQL
  UPDATE "GPT_QUESTIONS" SET content=:content WHERE Q_ID=:q_id
```

- Delete
```SQL
  DELETE FROM "GPT_QUESTIONS" WHERE Q_ID=:q_id
```

**ChatGPT에게 한 질문, 답변을 생성/조회/수정/삭제 가능합니다.**

![image](https://github.com/55soup/various-variable-name/assets/86298664/22355a8e-4a36-4727-aba5-54885053a8c4)

<br />
<br />

### 🧒마이페이지
- 📌사용 SQL문
```SQL
SELECT content, answer FROM "GPT_QUESTIONS" WHERE user_id = :user_id ORDER BY dates;
```
```SQL
SELECT * FROM users NATURAL JOIN gpt_questions WHERE user_id=:user_id;
```

![image](https://github.com/55soup/various-variable-name/assets/86298664/5a7c76ef-1bff-4300-a25d-a2d7ff7a2ad4)
<br />
<br />
<br />
<br />

## 🎞서비스 화면
| 메인화면 | 회원가입 | 로그인 | 마이페이지 |
|---|---|---|---|
|![image](https://github.com/55soup/various-variable-name/assets/86298664/22355a8e-4a36-4727-aba5-54885053a8c4)|![image](https://github.com/55soup/various-variable-name/assets/86298664/209d1daf-5198-4d77-9ad0-d08597c16690)|![image](https://github.com/55soup/various-variable-name/assets/86298664/e1321233-0c87-479b-b676-67abbfcef6b6)|![image](https://github.com/55soup/various-variable-name/assets/86298664/5a7c76ef-1bff-4300-a25d-a2d7ff7a2ad4)|

<br />
<br />
