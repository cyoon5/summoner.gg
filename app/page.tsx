'use client';

import styles from "./page.module.css"
import Image from 'next/image'
import { useState } from "react";


export default function Home() {

  const [userInput, setUserInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const gameName = userInput.substring(0,userInput.indexOf("#"));
    const tagLine = userInput.substring(userInput.indexOf("#")+1, userInput.length);

    const response = await fetch(`/api/riot?gameName=${gameName}&tagLine=${tagLine}`);
    const data = await response.json();
    console.log(data);

  }



  return (
    <div className = {styles.container}>
      <div>
          <h1 className = {styles.text}>summoner.gg</h1>
          <form onSubmit = {handleSubmit}>
            <input type = "search" id = {styles.searchbar} autoComplete = "off" onChange ={(e)=>setUserInput(e.target.value)}></input>
          </form>
          <p className = {styles.text}>
            League of Legends analytics platform
          </p>
      </div>
    </div>
  );
}