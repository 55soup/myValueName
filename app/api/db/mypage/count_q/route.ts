import connectionDB from "../../dbConn";

export async function GET(){
    const user_id=sessionStorage.getItem("user_id");
    const query = `SELECT COUNT(*) count_questions FROM users JOIN gpt_questions USING (user_id) WHERE USER_ID=${user_id}`;
    return connectionDB(query);
}