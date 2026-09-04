import dotenv from 'dotenv'
import { Pool } from 'pg';
dotenv.config();

async function seedChampions(){

    const patchResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patchResponse.json();
    const patch = patchList[0];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`);
    const champData = await response.json();


    const champions = Object.entries(champData.data).map(([_, value]: [any, any]) =>
        [value.id, value.name]
    );

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT)
    });

    const statement = "INSERT INTO champion(champion_id, champion_name) VALUES ($1, $2)";
    
    for(const champ of champions){
        await pool.query(statement, champ);
    }

    await pool.end();
}

seedChampions();