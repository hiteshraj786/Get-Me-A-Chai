"use client"
import { useSession, signOut } from 'next-auth/react'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false)
  const { data: session } = useSession()
  const dropdownRef = useRef(null)

  // click kahin bhi bahar ho to dropdown band ho jaye — koi timing race condition nahi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowdropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="bg-gray-900 text-white md:px-4 px-0 flex items-center justify-between md:h-16 flex-col md:flex-row h-auto md:py-0 py-4 ">
      <Link className="logo font-bold text-lg flex items-center justify-center" href={"/"}>
        <img src="/tea.gif" alt="tea" className="h-12 w-12 invertImg" />
        <span className="text-2xl  my-3 md:my-0 md:text-base">GetMeaChai</span>
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-3">
        {session && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              className="rounded-xl inline-flex items-center justify-center text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 hover:cursor-pointer "
              type="button"
            >
              Welcome {session.user.email}
              <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            <div className={`z-50 ${showdropdown ? "" : "hidden"} mt-2 absolute right-0 bg-neutral-primary-medium/90 backdrop-blur-md border border-default-medium rounded-lg shadow-xl w-44`}>
              <ul className="p-2 text-sm text-body font-medium">
                <li>
                  <Link href="/dashboard" onClick={() => setShowdropdown(false)} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} onClick={() => setShowdropdown(false)} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
                </li>
                <li>
                  <Link href="#" onClick={() => { setShowdropdown(false); signOut(); }} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {session && (
          <button onClick={() => signOut()} className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl hover:cursor-pointer">
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl hover:cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar



















// "use client"
// import { useSession, signIn, signOut } from 'next-auth/react'
// import React,{useState} from 'react'


// import Link from 'next/link'

// const Navbar = () => {
//   const [showdropdown, setShowdropdown] = useState(false)
//   const { data: session } = useSession()
//   // if(session){
//   //   return <>
//   //   Signed in as {session.user.email} <br />
//   //   <button onClick={()=>signOut()}>
//   //     Sign out
//   //   </button>

//   //   </>
//   // }
//   return (
//     <nav className="bg-gray-900 text-white px-4 flex items-center justify-between h-16">

//         <Link className="logo font-bold text-lg flex items-center justify-center" href={"/"}>
//         <img src="/tea.gif" alt="tea" className="h-12 w-12 invertImg" />
//         <span>GetMeaChai</span>
//         </Link>


//       {/* <ul className="flex  space-x-4">
//         <li>Home</li>
//         <li>About</li>
//         <li>Contact</li>
//         <li>Sign Up</li>
//         <li>Login</li>
//       </ul> */}

//       <div className="relative">
//         {session && <> <button onClick={()=>setShowdropdown(!showdropdown)} onBlur={()=>{setTimeout(() => {
//           setShowdropdown(false)
//         }, 100);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="rounded-xl mx-3 inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
//           Welcome {session.user.email}
//           <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
//         </button>


//           <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} rounded-lg mt-2 absolute right-0 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}>
//             <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
//               <li>
//                 <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
//               </li>
//               <li>
//                 <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
//               </li>
          
//               <li>
//                 <Link href="#" onClick={() => { signOut() }} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
//               </li>
//             </ul>
//           </div>

//         </>}
 

//         {session &&
//           <button onClick={() => { signOut() }} className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl">
//             Logout
//           </button>
//         }

//         {!session && <Link href={"/login"}>
//           <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl">
//             Login
//           </button>
//         </Link>}
//       </div>
//     </nav>
//   )
// }

// export default Navbar
