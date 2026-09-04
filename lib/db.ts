import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let pool: Pool;

export async function query(text: string, params: any[]){

    try{
        if(!pool){

            pool = new Pool({
                database: process.env.POSTGRES_DB,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT)
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
                database: process.env.POSTGRES_DB,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT)
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

