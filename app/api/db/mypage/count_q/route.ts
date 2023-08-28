import connectionDB from "../../dbConn";
import { cookies } from "next/headers";

export async function GET(){
    let user_id = cookies().get('user_id').value;

    const query = `SELECT COUNT(*) count_questions FROM users JOIN gpt_questions USING (user_id) WHERE USER_ID=${user_id}`;
    return connectionDB(query);
}