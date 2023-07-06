"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { loginWithAuth, checkForUser, logOut, getUserData} from "@/firebase/userFunctions";
import {auth, firestore} from "@/firebase/firebaseClient"
import Link from 'next/link'

export default function Header(){
    const [user, loading] = useAuthState(auth);

    if(loading){
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }
    else{

        return(
            <div className="navbar bg-base-100 top-0 sticky z-20 h-[30px] border-b-[1px] border-gray-800">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                        <a className="justify-between">
                            Parent
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                        </a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><Link href="profile">Profile</Link></li>
                    <li><Link href="profile/tests">Tests</Link></li>
                    {/* <li tabIndex={0}>
                        <a>
                        Parent
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li> */}
                    </ul>
                </div>
                <div className="navbar-end">
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
                </div>
        )
    }

}