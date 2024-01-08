import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const Header = () => {
  return (
    <header className='py-8 flex flex-col md:flex-row items center justify-between'>
        <Link href="/" legacyBehavior>
            <Image 
            className='w-64 mb-8 md:mb-0 cursor-pointer' 
            src='logo.svg' 
            alt="logo image" 
            width={300}
            height={100}
            />
        </Link>
        
        
       <div className='flex gap-2'>
         <Link href="/login" legacyBehavior>
            <a className='bg-red-700 hover:bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase'>Log In</a>
        </Link>
        <Link href="/createAccount" legacyBehavior>
            <a className='bg-black hover:bg-slate-700 px-5 py-3 rounded-lg text-white font-bold uppercase'>Join Us</a>
        </Link>
       </div>
    </header>
  )
}

export default Header
