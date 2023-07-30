"use client"

import style from "./profile.module.css"
import { devFunction } from "@/firebase/userFunctions"
import Link from "next/link"

export default function profilePage() {
    
    let content = {
        "div": "pusi kurac",
        h1: "naaslov"
    }

    function getData(){
        console.log(content)
        console.log(Object.entries(content))
    }

    function Scroll(id: string){
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"})
    }

    function devshit(){
        devFunction()
    }
    
    return(
        <main className={`${style.main_height} bg-base-100`}>
            <ul className={style.main_grid}>
                <Link href={"/profile/lekcija"}>
                    <li>
                        lekcije
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </li>
                </Link>
                
                <Link href={"/profile/tests"}>
                    <li>
                        testovi
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </li>
                </Link>
                
                <li onClick={devshit}>
                    videi (devFunc)

                </li>
                <li>dodatno</li>
            </ul>
        </main>
    )
}