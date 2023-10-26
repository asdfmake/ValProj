"use client"
import { auth, firestore } from "@/firebase/firebaseClient";
import { useEffect, useState } from "react";
import style from "./lekcije.module.css"
import Link from "next/link";
import { User, getAuth } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const handleCheckout = async (userId: string) => {
    const stripe = await stripePromise;

    // menjaj link ispod da dobijes adekvatan session
    const response = await fetch("/api/create-checkout-session/teir1checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    const session = await response.json();
    console.log(session);
    // Redirect the user to the Stripe checkout page
    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });
  };

async function fetchLessons(){
    try {
        let documents:Array<object> = [];
        await firestore.collection("content/lekcije/teir1").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.data() ? documents.push({id: doc.id, data: doc.data()}) : console.log('Document does not exist');
            });
          })
        return documents
    } catch (error) {
        return 0
    }

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

export default function testPage({params}: any) {
    let [lessons, setLesson] = useState<any>(null)
    let [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        if(!lessons){
            fetchLessons().then(e=>{
                setLesson(e)
                console.log(e)
            }).catch(e=>{
                console.error(e)
            })

            console.log("calling get user data");
            
            getUserData().then(e=>{
                console.log(e)
                setUserData(e)
            }).catch(e=>{
                console.error(e)
            })
        }
    }, [lessons]);

    return(

        <div className="bg-base-100  pb-[250px]">
            <h1 className="text-center text-3xl">Dostupne lekcije {userData?userData.uid:"nema usera"}</h1>
            <div className="lekcije">
                <section>
                    <h2 className="text-center text-2xl">Teir 1</h2>
                    {lessons && userData?
                        userData.products.includes("teir1")?
                        <ul className="list-none grid grid gap-4 p-8 grid-cols-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {lessons.map((item:any, index:any) => (
                            <section key={index}>   
                                <li className="lekcija h-full px-3 border-solid border-2 border-gray-600 rounded-xl">
                                    <h3 className="naslov text-center text-xl py-3 text-[2rem]">{item.id}</h3>
                                    <img src={item.data.slikaUrl} alt="" className="cover-lekcije w-full object-contain max-h-[25vh]" />
                                    <p className="opis text-sm text-center pt-4">{item.data.Opis}</p>
                                    <br />
                                    <Link href={"/profile/lekcija/teir1/" + item.id}>
                                      <button className="btn mx-[calc(17.5%-0.75rem)] my-2 w-9/12">Saznaj vise</button>
                                    </Link>
                                    
                                </li>
                            </section>
                            ))}
                        </ul>:
                        <figure className="p-8 h-[450px] px-auto m-auto overflow-hidden rounded-2xl">
                            <h2 className="text-center text-2xl">IME_LEKCIJE</h2>
                            <div className="hero w-full h-full" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg)'}}>
                                <div className="hero-overlay bg-opacity-60"></div>
                                    <div className="hero-content text-center text-neutral-content">
                                        <div className="max-w-md">
                                        <h1 className="mb-5 text-5xl font-bold">Niste pretplaceni na IME_LEKCIJE !</h1>
                                        <p className="mb-5">mozda opis lekicje</p>
                                        <button className="btn btn-primary">Saznaj vise</button>
                                        <button className="btn btn-secondary ml-[25px]" onClick={()=>{handleCheckout(userData.userid)}}>Pretplati se</button>
                                    </div>
                                </div>
                            </div>
                        </figure>
                        
                    :<p>ucitavaju se lekcije...</p>}
                </section>

                
            </div>
        </div>
        
        
    )
}