import connectionDB from "../../dbConn";
import getCookies from "../../getCookies";

export async function GET(){
    const query = `SELECT FLOOR(AVG(COUNT(*))) AVG_QUESTIONS FROM gpt_questions GROUP BY user_id`;
    return connectionDB(query);
}