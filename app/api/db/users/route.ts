import { NextResponse, NextRequest } from "next/server";
import { redirect } from 'next/navigation'
import connectionDB from "../dbConn";


export async function GET() {
    const query = `SELECT * FROM users`;
    return connectionDB(query);
}

// login router
export async function POST(request: NextRequest, response: NextResponse) {
    // const bodyData = await request.json(); // body 내용 가져오기
    // return NextResponse.json(bodyData);

    /*
    const formData = await request.formData(); // form 데이터에서 login input값 받아오기
    const email = formData.get('email')
    const password = formData.get('password')

    let connection
    try {
        connection = await oracledb.getConnection(dbconfig);
        const query = `SELECT EMAIL, PASSWORD FROM USERS WHERE TRIM(EMAIL)=:EMAIL`; // 이메일 공백제거 후 조건부
        const result = await connection.execute(query, [email], (err:any, result:any) => {
            if(err){
                console.error(err.message);
                return;
            }else{
                // db에서 가져온 데이터를 매칭함
                const userInfo = result.rows[0];
                if(userInfo !== undefined) {// 계정이 있다면
                    // {status : 200, headers: {'Content-Type': 'application/json',}}
                    if(password == userInfo.PASSWORD.trim()) console.log("로그인 성공") // 로그인 성공
                    else console.log("로그인 실패"); // 로그인 실패
                }else{
                    console.log("계정이 존재하지 않습니다.");
                }
            }
        })
        // 로그인 성공 후 홈으로 이동
        // return NextResponse.json({});
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
    */
}