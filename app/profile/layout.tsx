"use client"
import Header from "@/components/Header"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseClient";
import { redirect } from 'next/navigation'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  
  if(loading){

  }

  else if(user){
    return (
      <html lang="en" data-theme="winter">
        
        <body>
          <Header />
          {children}
          
        </body>
      </html>
    )
  }
  else if(!user){
    redirect("/login")
  }
  
}
