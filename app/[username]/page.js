import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import {notFound} from "next/navigation"
import User from '@/models/User'
import connectDB from '@/db/connectDB'

const Username = async ({ params }) => {
  const { username } = await params
 // if the username is not present in the database , show a 404 page

 const checkuser = async()=>{
  await connectDB() ;
  let u =  await User.findOne({username:username}) ;
  if(!u){
   return notFound()
  }
 }

 await checkuser() ;

  return (
    <>

    <PaymentPage username={username}/>
    </>

  )
}

export default Username

export async function generateMetadata({ params }) {
  const { username } = await params

  return {
    title: `${username} - Get Me a Chai`,
    description: `Support ${username} on Get Me a Chai`,
  }
}
 