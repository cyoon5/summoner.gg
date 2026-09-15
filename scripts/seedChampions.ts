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
        [value.id, value.name, value.key]
    );

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const statement = "INSERT INTO champion(champion_id, champion_name, champion_key) VALUES ($1, $2, $3)";
    
    for(const champ of champions){
        await pool.query(statement, champ);
    }

    await pool.end();
}

seedChampions();