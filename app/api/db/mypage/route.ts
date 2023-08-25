import connectionDB from "../dbConn";

export async function GET(){
    // mypage 정보 가져오기
    const user_id=2;
    const query = `SELECT * FROM users WHERE USER_ID=${user_id}`;
    // const query = `SELECT content, answer FROM gpt_questions WHERE USER_ID=${user_id} ORDER BY dates`;
    return connectionDB(query);
}