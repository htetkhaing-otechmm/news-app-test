"use client"
import { signOut } from "next-auth/react"

export default function SignoutButton (){


    return <button  className="leading-[48px] text-blue-800" onClick={signOut}>Logout</button>
}