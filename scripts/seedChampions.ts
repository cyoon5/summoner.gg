import dotenv from 'dotenv'
import { Pool } from 'pg';
dotenv.config();

async function seedChampions(){

    const patchResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patchResponse.json();
    const patch = patchList[0];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`);
    const champData = await response.json();


    const championNames = Object.keys(champData.data);

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT)
    });

    const statement = "INSERT INTO champion(champion_name) VALUES ($1)";
    
    for(const champ of championNames){
        await pool.query(statement, [champ]);
    }

    await pool.end();
}

seedChampions();