"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { updateProfile, fetchuser } from '@/actions/useractions'
import { toast, Bounce } from 'react-toastify';



const Dashboard = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter()

    const [form, setform] = useState({});

    useEffect(() => {
        if (status === "authenticated" && session?.user?.name) {
            getData()
        }

        if (status === "unauthenticated") {           // !session ki jagah ye
            router.push("/login")
        }
    }, [status, router, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        if (u) {
            setform(u)
        }
    }

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
    }

    if (status === "unauthenticated") {                // !session ki jagah ye
        return null;
    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        let a = await updateProfile(form, session.user.name)
        if (a?.error) {
            alert(a.error)
            return
        }
        await update()  
         toast('Profile updated!', {
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
    }
    return (
        
            <main className="px-6 py-6 text-white">
                
                <h1 className="text-3xl font-bold text-center mb-6">Welcome to your Dashboard</h1>

                <form className="md:max-w-1/2 mx-auto p-6 rounded-2xl border border-white/10 bg-white/3 shadow-xl shadow-black/20 space-y-5 text-left" action={handleSubmit}>

                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            id="Name"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="Name"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="email"
                            id="userEmail"
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="userEmail"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter email
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username || ""}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter username
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="url"
                            id="profilePicture"
                            name="profilepic"
                            value={form.profilepic || ""}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="profilePicture"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter profile picture URL
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="url"
                            id="coverPicture"
                            name="coverpic"
                            value={form.coverpic || ""}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="coverPicture"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter cover picture URL
                        </label>
                    </div>





                    <div className="relative z-0 w-full group">
                        <input
                            type="password"
                            id="razorpayId"
                            name="razorpayId"
                            value={form.razorpayId || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "

                        />
                        <label
                            htmlFor="razorpayId"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter razorpay ID
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="password"
                            id="razorpaySecret"
                            name="razorpaySecret"
                            value={form.razorpaySecret || ""}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block py-2.5 px-0 w-full text-sm text-left text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer"
                            placeholder=" "

                        />
                        <label
                            htmlFor="razorpaySecret"
                            className="absolute left-0 text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter razorpay Secret
                        </label>
                    </div>

                    <button
                        type="submit"

                        className="w-full text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-cyan-300/40 font-semibold rounded-base text-sm px-5 py-3 text-center mt-2 rounded-lg hover:cursor-pointer"
                    >
                        Save
                    </button>
                </form>
            </main>
        
    )
}

export default Dashboard
