import connectionDB from "../dbConn";
import getCookies from "../getCookies";

export async function GET(){
    // mypage 정보 가져오기
    // const hasSession = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;

    // cookies에 있는 user_id 가져오기
    const user_id = getCookies();
    // const query = `SELECT user_id, q_id, content, answer, dates, nickname, email, profile_photo, join_date
    // FROM gpt_questions NATURAL JOIN users
    // WHERE USER_ID=${user_id}`;

    const query =   `SELECT user_id, nickname, email, profile_photo, join_date
                    FROM users
                    WHERE USER_ID=${user_id}`
    // const query = `SELECT content, answer FROM gpt_questions WHERE USER_ID=${user_id} ORDER BY dates`;
    return connectionDB(query);
}