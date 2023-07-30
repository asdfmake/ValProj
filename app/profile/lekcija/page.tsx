"use client"

import Link from 'next/link';
import { firestore } from "@/firebase/firebaseClient";
import { collection, doc, getDoc, getDocs    ,setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./lekcija.module.css"

async function fetchLessons(){
    try {
        const lekcije = await getDocs(collection(firestore, 'content', "premium", 'lekcije'));
        lekcije.forEach(doc=>{
            console.log(doc.id, ' => ', doc.data());
        })
        const documentData = lekcije.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        /* mozda nema potrebe da fetchujem i test neka se samo redirectuje na page za to */
        return documentData
    } catch (error) {
        return 0
    }

}

function gotoLesson(lessonId: string){
    console.log(lessonId)
}

export default function lekcijePage({params}: any) {
    let [lessons, setLesson] = useState<any>(null)

    useEffect(() => {
        if(!lessons){
            fetchLessons().then(e=>{
                console.log(e)
                setLesson(e)
            }).catch(e=>{
                console.error(e)
            })
        }
    }, [lessons]);

    if(lessons){
        return (
            <main className={`${styles.nesto} bg-base-100`}>
                {
                    lessons.map((item:any, index:any) => (
                        <section key={index}>   
                            <figure className=" w-[450px] min-h-[350px]">
                                <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(' + item.slikaUrl + ')' }}>
                                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <h1 className="text-4xl font-bold text-white">{item.naslov}</h1>
                                        <p className="mt-4 text-xl text-white">{item.opis}</p>
                                        <button className="btn block m-auto opacity-80 mt-4"><Link href={"profile/lekcija/" + item.id}>learn more</Link></button>
                                    </div>
                                </div>
                            </figure>
                            <div className="flex justify-center items-center">
                                <p className="w-10/12 m-auto">
                                    {item.objasnjenje}                                    
                                </p>
                            </div>
                        </section>
                    ))
                }
                {/* <section>   
                    <figure className=" w-[450px] min-h-[350px]">
                        <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/id/2/600/500)' }}>
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <h1 className="text-4xl font-bold text-white">Main Header</h1>
                                <p className="mt-4 text-xl text-white">Description below the header</p>
                                <button className="btn block m-auto opacity-80 mt-4">learn more</button>
                            </div>
                        </div>
                    </figure>
                    <div className="flex justify-center items-center">
                        <p className="w-10/12 m-auto">
                            neki opis Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet illum modi porro exercitationem consequuntur odit rem corrupti, ut iste soluta? Alias necessitatibus laborum ea labore ipsa possimus asperiores! Dolorum, adipisci alias? Labore saepe, atque fugiat enim, repudiandae odit nemo culpa corrupti fuga, sit sed? Ipsum natus nobis aperiam aliquam, laborum sunt, dolores a excepturi cumque aut nostrum nesciunt laudantium quibusdam.
                            
                        </p>
                    </div>
                </section>
    
                <section className="">   
                    <figure className=" w-[450px] h-[350px]">
                        <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/id/250/600/500)' }}>
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <h1 className="text-4xl font-bold text-white">Main Header</h1>
                                <p className="mt-4 text-xl text-white">Description below the header</p>
                                <button className="btn block m-auto opacity-80 mt-4">learn more</button>
                            </div>
                        </div>
                    </figure>
                    <div className="flex justify-center items-center w-10/12 m-auto">
                        <p className="w-10/12 m-auto">neki opis Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet illum modi porro exercitationem consequuntur odit rem corrupti, ut iste soluta? Alias necessitatibus laborum ea labore ipsa possimus asperiores! Dolorum, adipisci alias? Labore saepe, atque fugiat enim, repudiandae odit nemo culpa corrupti fuga, sit sed? Ipsum natus nobis aperiam aliquam, laborum sunt, dolores a excepturi cumque aut nostrum nesciunt laudantium quibusdam.</p>
                    </div>
                </section> */}
                
            </main>
        )
    }
    else{//return skeleton here
        return "loading"
    }
    
}