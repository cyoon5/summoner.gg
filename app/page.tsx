'use client';

import styles from "./page.module.css"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import parseSummoner from "../lib/parseSummoner";
import { SearchInput, SummonerData } from "./types/summoner";


/*Refactors to do
 - Authenticate API key via header instead of query param
*/

export default function Home() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("");
  const [region, setRegion] = useState("na1");

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

      e.preventDefault();
      const parsed = parseSummoner(userInput);

      if(!parsed){
        console.log("Enter valid format gameName#tagLine");
        return;
      }

      const search: SummonerData = {
        region: region,
        gameName: parsed.gameName,
        tagLine: parsed.tagLine
      };
       
      router.push(`/profile/${search.region}/${search.gameName}/${search.tagLine}`);
  } 

  return (
    <div className = {styles.container}>
      <div>
          <h1 className = {styles.text}>summoner.gg</h1>
          <form onSubmit = {handleSubmit}>
            <input type = "search" id = {styles.searchbar} autoComplete = "off" onChange ={(e)=>setUserInput(e.target.value)}></input>
              <select onChange={(e)=>{setRegion(e.target.value)}}>
                <option value = "na1"> NA</option>
                <option value = "euw1"> EUW</option>
              </select>
          </form>
          <p className = {styles.text}>
            League of Legends analytics platform
          </p>
      </div>
    </div>
  );
}