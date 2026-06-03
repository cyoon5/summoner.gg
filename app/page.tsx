'use client';

import styles from "./page.module.css"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("");

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const [gameName, tagLine] = userInput.split("#");
    router.push(`/profile/${gameName}-${tagLine}`);
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