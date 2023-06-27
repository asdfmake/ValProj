"use client"

import { firebase, auth, firestore } from "@/firebase/firebaseClient"
import { getUserData } from '@/firebase/userFunctions'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

async function fetchLesson(){
    try {
        let lekcija = (await getDoc(doc(firestore, 'content', "premium", 'lekcije', "astrologijaBull"))).data();
        await getDoc(doc(firestore, 'content', "premium", 'testovi', lekcija!.testUid)).then(e=>{lekcija!.test = e.data(); delete lekcija!.testUid; console.log(e.data())})
        /* mozda nema potrebe da fetchujem i test neka se samo redirectuje na page za to */
        return lekcija 
    } catch (error) {
        return 0
    }

}

function Scroll(id: string){
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"})
}

export default function lekcijaPage({params}: any) {
    let [lesson, getLesson] = useState<any>(null)

    useEffect(() => {
        if(!lesson){
            fetchLesson().then(e=>{
                console.log(e)
                getLesson(e)
            }).catch(e=>{
                console.error(e)
            })
        }
    }, [lesson]);


    if(lesson == null){
        return (
            <p>Loading your lesson...</p>
        )
    }
    else if(lesson == 0){
        return (
            <p className="h-auto bg-red-600">there was an error while fetching the lesson</p>
        )
    }
    else{
        return(
            <main className="bg-base-100 p-[8px]">
                <nav className="breadcrumbs p-auto flex justify-center align-center top-12 sticky bg-base-100 z-10">{/* nestaje iza hero slike ispod */}
                    <div className="text-sm breadcrumbs text-center">
                        <ul className="p-auto">
                            <li onClick={()=>{Scroll("Video")}}><a>Video</a></li> 
                            <li onClick={()=>{Scroll("Opis")}}><a>Opis</a></li> 
                            <li onClick={()=>{Scroll("Opis")}}><a>Test</a></li>
                        </ul>
                    </div>
                </nav>

                <section className="h-[30rem] relative bg-cover bg-center bg-fixed z-1"style={{ backgroundImage: `url(${lesson.slikaUrl})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="container mx-auto px-4 py-20 relative z-2">
                        <h1 className="text-4xl font-bold text-white">{lesson.naslov}</h1>
                        <p className="text-lg text-white mt-4">{lesson.Opis}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 mt-8 rounded-md">
                        Get Started
                        </button>
                    </div>
                </section>

                <h1 className="text-center text-2xl">Naslov</h1>
                <section className="video p-[20px]" id="Video">
                    <div>
                        <figure className="bg-base-100 m-auto flex justify-center align-center">
                            <iframe width={560} height={315} src="https://www.youtube.com/embed/qv-3wYpHSBY" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        </figure>
                    </div>
                </section>

                <section dangerouslySetInnerHTML={{__html: lesson.objasnjenje}} className="description m-auto md:w-[80%] mt-[40px]" id="Opis">{/* stavi sve elemente u element koji ima klasu md:w-[80%] */}
                    {/* text se insertuje sa dangerouslySetInnerHTML */}
                </section>

                <section className="test mt-[40px]" id="Test">
                    <div className="w-[85%] h-[25vh] m-auto flex justify-center items-center text-2xl border-solid border-4 border-red-500 rounded">
                        <span>ovo je mesto za test ili neki CTA</span>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <p>{params.lekcijaUid}</p>
    )
}