import styles from "./page.module.css"


export default async function Page() {

  let api_key = process.env.RIOT_API_KEY;
  if(!api_key)
    throw new Error("missing api key");


  let link = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/MagicTurtle/KAKA?api_key=${api_key}`



  return (
    <div className = {styles.container}>
      <div>
          <h1 className = {styles.name}>summoner.gg</h1>
          <input type = "search" id = {styles.searchbar}></input>
          <p>
            League of Legends analytics platform
          </p>
      </div>
    </div>
  );
}