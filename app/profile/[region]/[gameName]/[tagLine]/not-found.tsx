import Link from "next/link";
import styles from "./not-found.module.css";
import Navbar from "@/components/navigation/Navbar";

export default function NotFound() {


    return (
        <div className = {styles.container}>

            <div className ={styles.leftbar}></div>
            <div className ={styles.rightbar}></div>
            <Navbar/>

            <div className = {styles.errorContainer}>
                <h1 className = {styles.notFoundText}>Summoner Not Found</h1>
                <p>Check the summoner name, tag, and region, then try again.</p>
                <Link href = "/search" className  = {styles.search}>Back to search</Link>
            </div>
            
            <span className = {styles.endinghorizontalborder}></span>

        </div>
    )
}