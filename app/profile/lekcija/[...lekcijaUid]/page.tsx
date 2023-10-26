"use client"

import { firebase, auth, firestore } from "@/firebase/firebaseClient"
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Test from "@/components/Test"

async function fetchLesson(lekcijeArr: Array<string>){
    try {
        let lekcija = (await getDoc(doc(firestore, 'content', "lekcije", lekcijeArr[0], lekcijeArr[1]))).data();
        await getDoc(doc(firestore, 'content', "premium", 'testovi', lekcija!.testUid)).then(e=>{lekcija!.test = e.data(); delete lekcija!.testUid; console.log(e.data())})
        /* mozda nema potrebe da fetchujem i test neka se samo redirectuje na page za to */
        console.log(lekcija)
        return lekcija 
    } catch (error) {
        return 0
    }

}

function Scroll(id: string){
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"})
}

async function getUserData() {
    return new Promise((resolve, reject) => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            if (user != null || user != undefined) {
                unsubscribe();
                firestore.collection("users").doc(user.uid).get().then(data => {
                    resolve({...data.data(), userid: user.uid});
                })
            } else {
                reject("User not authenticated.");
            }
        });
    });
}

export default function lekcijaPage({params}: any) {
    let [lesson, setLesson] = useState<any>(null)
    console.log(params.lekcijaUid)

    useEffect(() => {
        if(!lesson){
            fetchLesson(params.lekcijaUid).then(e=>{
                console.log(e)
                setLesson(e)
            }).catch(e=>{
                console.error(e)
            })
        }

        getUserData().then((e: any)=>{
            console.log(e)
            if(!e.products.includes("teir1")){
                setLesson(1)
            }
        }).catch(e=>{
            console.error(e)
        })
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
    else if(lesson == 1){
        return (
            <p className="h-auto bg-red-600">Niste pretplaceni na ovaj teir</p>
        )
    }
    else{
        return(
            <main className="bg-base-100 p-[8px]">
                <nav className="breadcrumbs p-auto flex justify-center align-center top-0 sticky bg-base-100 z-10">{/* nestaje iza hero slike ispod */}
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
                    <div className="w-[85%] m-auto flex justify-center items-center text-2xl border-solid border-4 border-red-500 rounded">
                        {/* <span>ovo je mesto za test ili neki CTA</span> */}
                        <Test/>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <p>{params.lekcijaUid}</p>
    )
}