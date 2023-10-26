"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { loginWithAuth, checkForUser, logOut, getUserData} from "@/firebase/userFunctions";
import {auth, firestore} from "@/firebase/firebaseClient"
import Link from 'next/link'

export default function Header(): JSX.Element{
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <></>
    }
    else{

        return(
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href={"/profile"}><li>Profile</li></Link>
                        <Link href={"/profile/tests"}><li>Testovi</li></Link>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Astrologija</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Link href={"/profile"}><li>Profile</li></Link>
                        <Link href={"/profile/tests"}><li>Testovi</li></Link>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-hover dropdown-end">
                        <label tabIndex={0} className="btn m-1">profile</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>trenutno koristite bezplatnu verziju sajta</a></li>
                            {/* <li><a>Item 2</a></li> */}
                        </ul>
                    </div>
                </div>
                {user?(
                        <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src={user.photoURL||"kita"} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={()=>{logOut()}}><a>Logout</a></li>
                        </ul>
                        </div>
                        ):(
                        <button className="btn" onClick={(e)=>{loginWithAuth(e, "withGoogle")}}>Log in</button>
                        )}
            </div>
                
        )
    }

}

/* {user?(
                        <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src={user.photoURL||"kita"} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={()=>{logOut()}}><a>Logout</a></li>
                        </ul>
                        </div>
                        ):(
                        <button className="btn" onClick={(e)=>{loginWithAuth(e, "withGoogle")}}>Log in</button>
                        )} */