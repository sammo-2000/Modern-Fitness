import React from 'react'
import GetProgram from "@/app/components/GetProgram"
import { cookies } from "next/headers";
import GetCookie from "@/app/utils/getCookie";

interface Params {
    id: string;
  }
  
export default  async function page({ params }:{ params: Params }) {
 
  return (
    
     
      
    <div>
       <header className="flex items-center justify-center text-5xl font-bold text-blue-700">My Programs</header>
        <GetProgram MemberId={params.id}/>

    </div>
    
  )
}


