import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config();

async function seedSpells(){
    const patchResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patchResponse.json();
    const patch = patchList[0];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`);  
    const spellData = await response.json();
    

    const spells = Object.entries(spellData.data).map(([_, value]: [any, any]) =>
        [Number(value.key), value.name]
    );

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });


    console.log(spells.length);

    const statement = 'INSERT INTO spell(spell_id, spell_name) VALUES ($1, $2) ON CONFLICT DO NOTHING';

    for(const spell of spells){
        await pool.query(statement, spell);
    }
    await pool.end();

}

seedSpells();