import { firebase, auth, firestore } from "../firebase/firebaseClient"

import { collection, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, User } from "firebase/auth";

import { redirect } from "next/dist/server/api-utils";


async function isUserPremium(){

    //returns true/false
}


async function checkForUser(user: User){
    let docSnapshot = await firestore.collection("users").doc(user.uid).get()
    if(docSnapshot.exists){
      return;
    }else{
      throw new Error("ne postoji")
    }
}

async function logOut(){
  signOut(auth)
}

async function loginWithAuth(e: any, providerStr: string){
    e.preventDefault()
    let provider;

    switch (providerStr) {
      case "withGoogle":
        provider = new GoogleAuthProvider();
        break;
    
      default:
        provider = null
        throw new Error("Nema provider type");
        break;
    }

    await signInWithPopup(auth, provider).then(userCred=>{ 
        getUserData(userCred.user.uid)
        checkForUser(userCred.user).then(()=>{
          //user exists
          //mozda return neka redirekcija

          console.log("korisnik postoji, nastavi")
          return;
        }).catch(e=>{
          console.log("user doesnt exits, automaticly signing user up")
          signUp(userCred)
          /* logOut(); */
        })
        
    }).then(e=>{
      console.log("logged in successfully")
      
    }).catch(e=>{
      console.error("user didn't login")
    })
    return 1;
    //can return error or exeption if user does not exits
}

async function signUp(userCred: UserCredential){
    firestore.collection("users").doc(userCred.user?.uid).set({
        "ime": userCred.user?.displayName,
        "mail": userCred.user?.email,
        "profileTier": "basic",
        "uid": userCred.user.uid,//ne mora vrv
    })
    //can return error or exeption if user allready exits
}

async function getUserData(userUid: string){

  let userData = (await firestore.collection("users").doc(userUid).get()).data()
  if(userData){
    if(userData.profileTier == "premium"){
      console.log("user je premium")
    }
  }
  //KORISTI NEW MAP DA DODAJES OPCIJE NA MAPU AKO I SWITCH KOJI DODAJE U MAPU ONO STO SI HTEO 

  return userData;
}

async function getTests(userData:object){
  //moze ovde provera da li je user premium
  const nesto = await getDoc(doc(firestore, 'content', "premium", 'testovi', "test1"));

  let moguciTestovi : Array<object> = [];

  const querySnapshot = await firestore.collection("content/premium/testovi").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.data() ? moguciTestovi.push({id: doc.id, data: doc.data()}) : console.log('Document does not exist');
    });
  })
  
  return moguciTestovi
}

async function upgradeUser(userId: string){
  firestore.collection("users").doc(userId).update({
    profileTier: "upgraded"
  })
}

async function devFunction(){
  await setDoc(doc(firestore, "content", "premium", "lekcije", "ovan"), {
    
      "objasnjenje": "                Lorem ipsum dolor sit amet consectetur adipisicing elit.                  <h2>neki naslov u tekstu</h2>                 Dicta mollitia repellat aspernatur! Incidunt aperiam deserunt fugiat earum odit quibusdam qui quae, rem vero quia, voluptatum blanditiis esse ab expedita! Dolore sed fuga nostrum, cum adipisci doloribus? Ut delectus, quae maxime nihil rem, error consequuntur, laborum sit harum consequatur voluptas in odit explicabo quia corrupti quidem! Odit pariatur optio vitae amet expedita placeat nesciunt eius illum cupiditate tempora aspernatur corrupti vero rerum tempore mollitia voluptatibus modi, ipsum error nulla! Ipsa ad voluptatibus cum beatae quaerat doloribus ut laborum odit dolor obcaecati iusto suscipit, error nulla pariatur quia temporibus hic sapiente? Quis aliquid ex doloribus dolore est quidem laboriosam quo architecto error consectetur ipsam officiis temporibus similique beatae, omnis laborum assumenda facere.",
      "slikaUrl": "https://www.alo.rs/data/images/2022-04-11/635620_shutterstock-777332347_f.webp?timestamp=1649628000",
      "naslov": "Ovan osnove",
      "Opis": "Ovan je poznat kao prvi horoskopski znak. Vlada prvom kucom astrala ili ti ascendent-om (podznakom) horoskopa. Ovan je vatreni znak, sta jos mogu da se iskenjam u opisu",
      "testUid": "test2"
  
  })
}

export {isUserPremium, loginWithAuth, signUp, checkForUser, logOut, getUserData, upgradeUser, getTests, devFunction}
