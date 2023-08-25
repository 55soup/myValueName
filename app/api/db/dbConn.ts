import dbconfig from "../../assets/dbconfig";
import { NextResponse } from "next/server";

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true; // 자동 커밋

export default async function connectionDB(query:string, bindData:any = undefined) {
    let connection, result;
    try {
        connection = await oracledb.getConnection(dbconfig);
        if(bindData){ // bindData가 있다면
            result = await connection.execute(query, bindData, (err:any, result:any) => {
                if(err) console.error(err);
                else return ;
            });
            // GET 요청인 경우
            console.log(result);
            return NextResponse.json(bindData);
        }else{
            result = await connection.execute(query);
            return NextResponse.json(result.rows);
        }
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
