import { NextResponse, NextRequest } from "next/server";
import { redirect } from 'next/navigation'
import connectionDB from "../dbConn";
import dbconfig from "@/app/assets/dbconfig";

const oracledb = require('oracledb')

export async function GET() {
    const query = `SELECT * FROM USERINFO`; // VIEW 불러오기
    return connectionDB(query);
}

// login router
export async function POST(request: NextRequest, response: NextResponse) {
    let returnJSON;
    const bodyData = await request.json(); // body 내용 가져오기
    const [ email, password ] = [bodyData.email, bodyData.password];

    let connection
    try {
        connection = await oracledb.getConnection(dbconfig);
        const query = `SELECT USER_ID, EMAIL, PASSWORD FROM USERS WHERE TRIM(EMAIL)=:EMAIL`; // 이메일 공백제거 후 조건부
        const result = await connection.execute(query, [email], (err:any, result:any) => {
            if(err){
                console.error(err.message);
                return;
            }else{
                // db에서 가져온 데이터를 매칭함
                const userInfo = result.rows[0];
                if(userInfo !== undefined) {// 계정이 있다면
                    if(password == userInfo.PASSWORD.trim()) {
                        // 로그인 성공
                        returnJSON = {
                            status : 200,
                            user_id: userInfo.USER_ID, 
                            headers: {'Content-Type': 'application/json'},
                            statusMessage : "login success"
                        };  
                    }else {
                        // 로그인 실패
                        returnJSON = {
                            status : 401, 
                            headers: {'Content-Type': 'application/json'},
                            statusMessage: "invalid password"
                        };  
                    }
                }else{ // 계정이 없다면
                    returnJSON = {
                        status : 401, 
                        headers: {'Content-Type': 'application/json'},
                        statusMessage: "invalid user id"
                    };  
                }
            }
        })
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

    return NextResponse.json(returnJSON);
}