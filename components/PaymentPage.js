"use client"
import React, { use, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
  const { data: session } = useSession()
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentUser, setCurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getData = async (params) => {
    let u = await fetchuser(username)
    if (u) {
      setCurrentUser(u)
    }
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)

  }





  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast('Thanks for your donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      router.replace(`/${username}`)
    }


  }, [])



  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. 
      "currency": "INR",
      "name": "Get Me A Chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Anuj Saini", //your customer's name
        "email": "anuj.saini@example.com",
        "contact": "+917878734907" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }

    }

    var rzp1 = new Razorpay(options);
    rzp1.open();

  }

  return (
    <>


   
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      {/* <div className="object-cover w-full relative">
        <img src={currentUser.coverpic} alt="" className="w-full h-96 object-cover" />

        <div className="profile absolute -bottom-20 right-[45%] border-white border rounded-xl">
          <img className="rounded-xl" height={130} width={130} src={currentUser.profilepic} alt="Avatar" />
        </div>
      </div> */}
      <div className="w-full relative">
        <img src={currentUser.coverpic} alt="" className="w-full h-40 sm:h-64 md:h-96 object-cover" />

        <div className="profile absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 border-white border rounded-xl">
         <img
            className="rounded-xl w-20 h-20 sm:w-28 sm:h-28 md:w-32.5 md:h-32.5 object-cover"
           src={currentUser.profilepic}
            alt="Avatar"
          />
        </div>
      </div>
   


      <div className="info flex justify-center flex-col items-center  mt-14 md:mt-24 mb-24 text-white gap-2">

        <div className="text-white text-center font-bold">
          @{username}
        </div>
        <div className="text-slate-400  text-center">
          Lets help {username} to get a chai.
        </div>
        <div className="text-slate-400 text-center">
          {payments.length} supporters have donated <span className="font-bold">₹{payments.reduce((acc, curr) => acc + parseInt(curr.amount), 0)}</span> so far.
        </div>

      </div>

      <div className="payment flex flex-col md:flex-row justify-center w-[80%] gap-4 mx-auto my-10">
        <div className="supporters w-full md:w-1/2 bg-slate-900 text-white  p-10 rounded-lg">

          <h2 className="text-2xl font-bold my-3">Top 10 Supporters</h2>
          <ul className="mx-2">
            {payments.length === 0 && <div className="text-slate-400">No supporters yet. Be the first one to support!</div>}
            {payments.map((payment, index) => (
              <li key={index} className="text-slate-300 gap-2 my-4 flex items-start">
                <img width={33} src="/avatar.gif" alt="avatar" className="rounded-full shrink-0" />
                <p className="leading-relaxed">
                  <span className="font-semibold">{payment.name}</span> donated <span className="font-bold">₹{payment.amount}</span> with a message "{payment.message}"
                </p>
              </li>
            ))}

          </ul>
        </div>
        <div className="makepayment w-full md:w-1/2 bg-slate-900 text-white rounded-lg  p-10">
          <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
          <div className="flex gap-2 ">

            {/* input for name and message */}
            <input onChange={handleChange} value={paymentform.name} name="name" type="text" placeholder="Enter Name" className="bg-slate-800 p-3 rounded-lg w-full" />
            <input onChange={handleChange} value={paymentform.message} name="message" type="text" placeholder="Enter Message" className="bg-slate-800 p-3 rounded-lg w-full" />
          </div>
          <div className="flex gap-2 mt-5">
            {/* input for amount and pay button */}

            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" placeholder="Enter Amount" className="bg-slate-800 p-3 rounded-lg w-full" />
            <button type="button" onClick={() => { pay(paymentform.amount) }} className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg disabled:from-purple-200  hover:cursor-pointer" disabled={paymentform.name?.length < 2 || paymentform.message?.length < 3 || paymentform.amount?.length < 1} >Pay</button>

          </div>
          {/* Or choose from these amounts  */}
          <div className="flex gap-2 mt-5">
            <button className="bg-slate-800 p-3 rounded-lg disabled:from-purple-200 hover:cursor-pointer" onClick={() => pay(1000)} disabled={paymentform.name?.length < 2 || paymentform.message?.length < 3} > ₹1000 </button>
            <button className="bg-slate-800 p-3 rounded-lg disabled:from-purple-200 hover:cursor-pointer" onClick={() => pay(2000)} disabled={paymentform.name?.length < 2 || paymentform.message?.length < 3} > ₹2000 </button>
            <button className="bg-slate-800 p-3 rounded-lg disabled:from-purple-200 hover:cursor-pointer" onClick={() => pay(5000)} disabled={paymentform.name?.length < 2 || paymentform.message?.length < 3} > ₹5000 </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default PaymentPage
