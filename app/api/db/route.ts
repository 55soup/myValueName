import connectionDB from "./dbConn";
import { NextResponse } from "next/server";
import getCookies from "./getCookies";

export async function GET() {
    // user_id WHERE 조건이 있을 경우
    const user_id = getCookies();
    const query:string = `SELECT * FROM GPT_QUESTIONS WHERE user_id=${user_id} ORDER BY Q_ID`;
    return connectionDB(query);
}

export async function POST(request: Request) {
    const bodyData = await request.json();
    console.log(bodyData);

    const bindData = [
        Number(bodyData.user_id),
        bodyData.content,
        bodyData.answer,
        bodyData.dates
    ];

    const query = `INSERT INTO "SUNJO"."GPT_QUESTIONS" (USER_ID, CONTENT, ANSWER, DATES) VALUES (:user_id, :content, :answer, :dates)`
    connectionDB(query, bindData);
    return NextResponse.json(bodyData);
}

export async function PATCH(request: Request){
    // 수정할 내용 가져오기, 질문 아이디
    const bodyData = await request.json();

    const bindData:any = [bodyData.content, bodyData.q_id];
    const query:string = `UPDATE gpt_questions SET content=:content WHERE Q_ID=:q_id`;
    connectionDB(query, bindData);
    return NextResponse.json({});
}

export async function DELETE(request: Request){
    // 삭제할 질문 아이디 가져오기
    const bodyData = await request.json();

    const bindData:any = [bodyData.q_id];
    const query:string = `DELETE FROM gpt_questions WHERE Q_ID=:q_id`;
    connectionDB(query, bindData);
    return NextResponse.json({});
}