import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className='py-8 flex flex-col md:flex-row items center justify-between'>
        <Image 
        className='w-64 mb-8 md:mb-0' 
        src='logo.svg' 
        alt="logo image" 
        width={300}
        height={100}
        />
    </header>
  )
}

export default Header
