"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/firebaseClient"
import { getUserData, getTests, devFunction } from "@/firebase/userFunctions";
import React, { useState, useEffect, use } from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from 'next/navigation';

import styles from "./tests.module.css"

export default function testsPage() : JSX.Element {
    const [tests, setTests] = useState<any>(null)

    const router = useRouter()

    useEffect(() => {
        let load = async ()=>{
            getTests("nekiTest").then(res=>{console.log(res); setTests(res)})
        }
        load()
    }); // Include the 'user' dependency in the dependency array
    

    function goToTest(test: string){
        if (typeof window !== 'undefined') {
            router.push(window.location.pathname + "/" + test)
        }
    }
    
    return(
        <main className="bg-base-100 pt-10">
            
            <section className={styles["cards-holder"]}>
                <h1>Dostupni testovi</h1>
                
                <div className="testovi-grid">
                    {(tests == null)?"loading tests...":
                        tests.map((item:any, index:any) => (
                            <div key={index} className={styles.card}>
                                <h2>{item.id}</h2>
                                <img src={item.data.info.img} alt="slika se sjebala" />
                                <p>{item.data.info.desciption}</p>
                                <button className="btn" onClick={()=>{goToTest(item.id)}}>Odradi</button>
                            </div>
                        ))
                    }{/* TYPO U INFO.DESCIPTION CRINGE ALART */}
                    
                    
                </div>
                
                
            </section>
            
            
        </main>
    )

}