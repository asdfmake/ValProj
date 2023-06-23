"use client"

import { firebase, auth, firestore } from "@/firebase/firebaseClient"
import { getUserData } from '@/firebase/userFunctions'
import { doc, getDoc } from "firebase/firestore";

async function getLesson(){
    let nesto = (await getDoc(doc(firestore, 'content', "premium", 'lekcije', "astrologijaBull"))).data();
    await getDoc(doc(firestore, 'content', "premium", 'testovi', nesto!.testUid)).then(e=>{nesto!.test = e.data(); delete nesto!.testUid; console.log(e.data())})
    return nesto
}

export default function lekcijaPage({params}: any) {
    let lesson;
    getLesson().then(e=>{
        console.log(e)
    })

    return (
        <p>{params.lekcijaUid}</p>
    )
}