'use client';

import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
import { useState } from "react";
import parseSummoner from "../lib/parseSummoner";
import { SummonerData } from "./types/summoner";
import { regions } from "./services/constants";
import Image from 'next/image'

//https://reactbits.dev/ landing page animation with champion icon


export default function SearchSummoner() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("");
  const [region, setRegion] = useState("na1");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

      e.preventDefault();
      const parsed = parseSummoner(userInput);

      if(!parsed){
        alert("Enter valid format gameName#tagLine");
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

    <div className = {styles.container} onClick={() => setOpen(false)}>

      <div className = {styles.mainContainer}>

          <h1 className = {styles.text}>summoner.gg</h1>

          <form onSubmit = {handleSubmit}>

            <div className = {styles.inputContainer}>

              <input type = "search" 
                className = {styles.searchbar} 
                placeholder = "Search a summoner"
                autoComplete = "off" 
                onChange = {(e)=>setUserInput(e.target.value)}>
              </input>

              <div className={styles.dropdownButton} onClick={(e)=> {setOpen(o => !o); e.stopPropagation()}}>

                <div className = {styles.regionText}>
                  {regions.find(r => r.value === region)?.label}
                </div>  
                
                {
                  open && (<div className = {styles.options}>
                    {
                      regions.map(r => (
                        <div 
                          key = {r.value} 
                          className = {styles.option}
                          onClick={(e) => { setOpen(false); setRegion(r.value); e.stopPropagation();}}
                        > 
                          {r.label}
                        </div>
                      ))
                    }
                  </div>)
                }
           
                
                
              </div>

              <button className = {styles.searchButton}>
                <Image
                  className = {styles.searchIcon}
                  src = "/searchIcon.png"
                  width = {100}
                  height = {100}
                  alt = ""
                  onClick={()=>handleSubmit}
                />
              </button>
             
            </div>


          </form>

          <p className = {styles.text}>
            League of Legends analytics platform
          </p>

      </div>

    </div>

  )
}