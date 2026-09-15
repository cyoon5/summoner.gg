import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let pool: Pool;

export async function query(text: string, params: any[]){

    try{
        if(!pool){
            pool = new Pool({
                connectionString: process.env.DATABASE_URL
            });
        }
        
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
    }
    catch(err){
        console.log("db query error: ", err)
        throw err;
    }
}


export async function getClient(){

    try{
        if(!pool){
            pool = new Pool({
                connectionString: process.env.DATABASE_URL
            });
        }

        const client = await pool.connect();
        return client;
    }
    catch(err){
        console.log("Failed to get client", err)
        throw err;
    }
}

