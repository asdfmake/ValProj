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


    signInWithPopup(auth, provider).then(userCred=>{ 
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
        
    }).catch(e=>{
      console.error("user didn't login")
    })

    
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
  /* await setDoc(doc(firestore, "content", "premium", "testovi", "test1"), {
    "info":{
      "img": "imglink",
      "tezina": 3,
      "desciption": "neki opis za neki test 1"
    },

      "pitanja": [
          {
              "opcije": [
                  "opcija1",
                  "opcija2",
                  "opcija3",
                  "tacan odgovor"
              ],
              "pitanje": "neko pitanje",
              "odgovor": "tacan odgovor"
          },
          {
              "odgovor": "odgovor2",
              "pitanje": "neko pitanje 2",
              "opcije": [
                  "opcija1 za 2",
                  "opcija2 za 2",
                  "opcija3 za 3",
                  "odgovor2"
              ]
          }
      ]
  }); */

/*   const nesto = await getDoc(doc(firestore, 'content', "premium", 'testovi', "test3"));
  console.log(nesto.data()) */

}

export {isUserPremium, loginWithAuth, signUp, checkForUser, logOut, getUserData, upgradeUser, getTests, devFunction}
