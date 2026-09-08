import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config();



async function seedRunes(){
    const patchResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const patchList = await patchResponse.json();
    const patch = patchList[0];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`);
    const runeData = await response.json();


    const runes = runeData.flatMap((tree:any) => 
        tree.slots.flatMap((runeSlot:any) =>
            runeSlot.runes.map((rune:any)=>
                [rune.id, rune.name]
            )
        )
    )

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT)
    });


    const statShards = [
        [5001, "AbilityHaste"],
        [5002, "AdaptiveForce"],
        [5003, "HealthScaling"],
        [5005, "AttackSpeed"],
        [5007, "AbilityHaste"],
        [5008, "AdaptiveForce"],
        [5010, "Tenacity"],
        [5011, "HealthScaling"],
        [5013, "Tenacity"],
        [5014, "MovementSpeed"],
    ];

    const statement = 'INSERT INTO rune(rune_id, rune_name) VALUES ($1, $2) ON CONFLICT DO NOTHING';

    for(const rune of runes){
        await pool.query(statement, rune);
    }

    for(const shard of statShards){
        await pool.query(statement, shard);
    }

    await pool.end();

}   

seedRunes();