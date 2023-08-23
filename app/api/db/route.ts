import { NextResponse } from "next/server";
import dbconfig from "../../assets/dbconfig";

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true; // 자동 커밋

export async function GET() {
    let connection
    try {
        connection = await oracledb.getConnection(dbconfig);
        const query = `SELECT * FROM GPT_QUESTIONS`;
        const result = await connection.execute(query);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log("dbtest error")
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
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

    let connection
    try {
        connection = await oracledb.getConnection(dbconfig); 
        // const query = `INSERT INTO "SUNJO"."GPT_QUESTIONS" (USER_ID, CONTENT, ANSWER, DATES) VALUES (2, '햄버거 객체 이름 추천해줘', 'burgerObject, hamburgerObject, burgerOrder', 'Wed Aug 23 2023')`;
        const query = `INSERT INTO "SUNJO"."GPT_QUESTIONS" (USER_ID, CONTENT, ANSWER, DATES) VALUES (:user_id, :content, :answer, :dates)`;
        const result = await connection.execute(query, bindData, (err:any, result:any) => {
            if(err) console.error(err);
            else return ;
        });
        return NextResponse.json(request.body);
        
    } catch (error) {
        console.log("dbtest error")
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}