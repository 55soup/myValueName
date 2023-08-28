import connectionDB from "../dbConn";
import { cookies } from "next/headers";

export async function GET(){
    // mypage 정보 가져오기
    // const hasSession = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    let user_id = cookies().get('user_id').value;

    const query = `SELECT user_id, q_id, content, answer, dates, nickname, email, profile_photo, join_date
    FROM gpt_questions NATURAL JOIN users
    WHERE USER_ID=${user_id}`;

    // const query = `SELECT content, answer FROM gpt_questions WHERE USER_ID=${user_id} ORDER BY dates`;
    return connectionDB(query);
}