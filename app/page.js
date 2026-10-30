import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (

    <>
  
    <div  className="flex flex-col items-center justify-center h-[44vh] text-white px-5 md:px-0 text-xs md:text-base">
      <div className="flex justify-center items-center font-bold text-white text-2xl md:text-5xl">Get Me a Chai <span> <img className="invertImg" src="/tea.gif" width={88} height={88} alt="" />  </span> </div>
      <p className="mt-4 text-center md:text-left">
        A crowdfunding platform for creators. Get your projects funded by the community and bring your ideas to life!
      </p>
      <p className="mt-4 text-center md:text-left">
        A palce where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
      </p>

      <div className="flex space-x-4 mt-4">
        <Link href={"/login"}>
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl hover:cursor-pointer">Start here</button>
        </Link>

        <Link href={"/about"}>
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl hover:cursor-pointer">Read more</button>
        </Link>
      </div>    
    </div>
    <div className="bg-white h-1 opacity-10"></div>

    <div className="text-white container mx-auto md:px-4 pb-32 pt-14 px-10">
      <h2 className="text-3xl font-bold text-center mb-14">
        Your Fans can buy you a Chai
      </h2>
      <div className="flex gap-5 justify-around">
        <div className="item space-y-3 flex flex-col justify-center items-center md:w-[30%]">
          <img className="bg-slate-400 rounded-full p-2 text-black" src="/man.gif" width={88} height={88} alt="" />
          <p className="font-bold text-center">Fans want to help</p>
          <p className="text-center">Your fans are eager to support the work you do — let them be part of your journey.</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center md:w-[30%]">
          <img className="bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} height={88} alt="" />
          <p className="font-bold text-center">Get paid instantly</p>
          <p className="text-center">Receive support directly to your account — no delays, no middlemen.</p>
        </div>
        <div className="item space-y-3 flex flex-col justify-center items-center md:w-[30%]">
          <img className="bg-slate-400 rounded-full p-2 text-black" src="/group.gif" width={88} height={88} alt="" />
          <p className="font-bold text-center">Build a community</p>
          <p className="text-center">Every chai is a fan saying they believe in what you create.</p>
        </div>

      </div>
      
    </div>


    <div className="bg-white h-1 opacity-10"></div>


    <div className=" flex flex-col items-center justify-center text-white container mx-auto px-4 pb-32 pt-14">
      <h2 className="text-3xl font-bold text-center mb-14">
        Learn More About US 
      </h2>
      {/* <iframe className="md:w-140 md:h-78.75" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
    
        // <iframe
        //   className="w-full h-full rounded-lg"
        //   // src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn"
        //   src="https://youtu.be/ND9EbMDXpy0?si=9zdpPk2VaSSeOfDH"
        //   title="YouTube video player"
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //   allowFullScreen
        // ></iframe>

      <div className="w-full max-w-3xl aspect-video">
       <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/ND9EbMDXpy0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        ></iframe>
      </div>
     
      
    </div>

    </>
  );
}
