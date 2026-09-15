import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();


async function seedItems() {

    const patchResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patchResponse.json();
    const patch = patchList[0];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`);
    const itemData = await response.json();


    const items = Object.entries(itemData.data).filter((i:any) => Number(i[0]) !== 3901 && Number(i[0]) !== 3902 && Number(i[0]) !== 3903).map((i:any)=> {

        const id = Number(i[0]);

        return [id, i[1].name];

    });

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const statement = "INSERT INTO Item(item_id, item_name) VALUES($1, $2)";

    try{
        const client = await pool.connect();

        for (const item of items) {
            await client.query(statement, item);
        }

        client.release();
        await pool.end();
    }
    catch(err){
        console.log(err);
    }

}

seedItems();
