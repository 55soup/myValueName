import connectionDB from "../../dbConn";
import getCookies from "../../getCookies";

export async function GET(){
    const user_id = getCookies();

    const query = `SELECT COUNT(*) count_questions FROM users JOIN gpt_questions USING (user_id) WHERE USER_ID=${user_id}`;
    return connectionDB(query);
}