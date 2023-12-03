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
        <GetProgram MemberId={params.id}/>

    </div>
  )
}


