import connectionDB from "../dbConn";

export async function POST(request: Request){
    const bodyData = await request.json();

    const bindData = [
        bodyData.nickname,
        bodyData.email,
        bodyData.join_date,
        bodyData.password
    ];

    const query = `INSERT INTO "SUNJO"."USERS" (NICKNAME, EMAIL, JOIN_DATE, PASSWORD) VALUES (:nickname, :email, :join_date, :password)`;

    return connectionDB(query, bindData);
}