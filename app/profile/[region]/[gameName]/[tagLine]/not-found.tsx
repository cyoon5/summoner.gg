import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {


    return (
        <div className = {styles.container}>
            <h1 className = {styles.notFoundText}>Summoner Not Found</h1>
            <p>Check the summoner name and tag and try again</p>
            <Link href = "/" className  = {styles.home}>Go Home</Link>
        </div>
    )
}