import { NextResponse } from "next/server";
import dbconfig from "../../assets/dbconfig";

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

export async function GET() {
    let connection
    try {
        connection = await oracledb.getConnection(dbconfig);
        const query = `SELECT * FROM gpt_questions`;
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