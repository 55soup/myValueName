import { NextResponse } from "next/server";
import dbconfig from "../../assets/dbconfig";

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true; // 자동 커밋

async function connectionDB(query:string, bindData:any = undefined) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(dbconfig);
        if(bindData) // sql문에 넣어야할 데이터가 있다면
            result = await connection.execute(query, bindData, (err:any, result:any) => {
                if(err) console.error(err);
                else return ;
            });
        else
            result = await connection.execute(query);
        
        //return NextResponse.json(request.body);
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

export async function GET() {
    const query = `SELECT * FROM GPT_QUESTIONS ORDER BY Q_ID`;
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
}

export async function PATCH(request: Request){
    
}

export async function DELETE(request: Request){
    
}