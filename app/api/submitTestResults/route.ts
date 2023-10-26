import { firestore } from "@/firebase/firebaseClient";
import { arrayUnion, doc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    let request: any = await req.json()
    let {userUid, ...newScore} = request
    /* firestore.collection("users").doc(request.userUid).update({
        tests: arrayUnion(newScore)
    }) */

    let usersDoc = firestore.collection("users").doc(request.userUid);

    usersDoc.get().then(docSnapshot=>{
        let tests = docSnapshot.data()!.tests

        if(tests.length == 0){
            usersDoc.update({
                tests: arrayUnion(newScore)
            }) 
        }
        
        let score = 0;
        tests.forEach((element:any) => {
            score += element.result;
            console.log(score)
            if(!element.test == newScore.test){
                usersDoc.update({
                    tests: arrayUnion(newScore)
                })
            }
        });
        usersDoc.update({
            score: score
        })
        
    })
    
    console.log(newScore)
    return NextResponse.json({});
}