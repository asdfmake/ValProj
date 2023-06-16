"use client"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/firebaseClient"
import { getUserData, getTests, devFunction } from "@/firebase/userFunctions";
import { useState, useEffect, use } from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from 'next/navigation';

import styles from "./tests.module.css"

const asdf = () =>
  new Promise(resolve => {
    setTimeout(() => {
      const data = { name: 'John', age: 30 };
      resolve(data);
    }, 2000);
  });

export default function testsPage() {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(Object)
    const [tests, setTests] = useState<any>(null)

    const router = useRouter()

    useEffect(() => {
        if (user) {
            let load = async ()=>{
                let data = await getUserData(user.uid)
                setUserData(data)

                getTests(data!).then(res=>{console.log(res); setTests(res)})
            }
            load()
            
        }
    }, [user]); // Include the 'user' dependency in the dependency array
    

    function goToTest(test: string){
        if (typeof window !== 'undefined') {
            router.push(window.location.pathname + "/" + test)
        }
    }
    

    if(user){
        

        console.log(userData)
        return(
            <main className="bg-base-100 pt-10">
                {/* <p>Welcome back {user.displayName}</p> 
                <p>{userData==null?"loading user data..":JSON.stringify(userData)}</p>
                <p>nesto</p>
                <p>{userData==null?"loading nesto..": JSON.stringify(tests)}</p>
                <button className="btn btn-active btn-accent" onClick={()=>{devFunction()}}>Test function</button>
 */}
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
                        
                        
                        
                        {/* <div className={styles.card}>
                            <h2>neki naslov</h2>
                            <img src="https://picsum.photos/id/18/400/400" alt="slika se sjebala" />
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur nulla iure vitae expedita quod?</p>
                            <button className="btn">Odradi</button>
                        </div>
                        <div className={styles.card}>
                            <h2>neki naslov</h2>
                            <img src="https://picsum.photos/id/18/400/400" alt="slika se sjebala" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugit ex consequuntur, laboriosam quis autem.</p>
                            <button className="btn">Odradi</button>
                        </div>
                        <div className={styles.card}>
                            <h2>neki naslov</h2>
                            <img src="https://picsum.photos/id/18/400/400" alt="slika se sjebala" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo reprehenderit in laboriosam blanditiis, provident sed!</p>
                            <button className="btn">Odradi</button>
                        </div> */}
                    </div>
                    
                    
                </section>
                
                
            </main>
        )}

    return(
        "tests page"
    )
}