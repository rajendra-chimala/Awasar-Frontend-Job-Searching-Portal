import React from 'react'

const Header = () => {
  return (
    <div>
<header className="text-gray-600 body-font shadow-md">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     <img src="/awasar.png" alt="Logo" className="h-10 text-white p-2  rounded-full" />
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:[#6954ff]">First Link</a>
      <a className="mr-5 hover:[#6954ff]">First Link</a>
      <a className="mr-5 hover:[#6954ff]">First Link</a>
      <a className="mr-5 hover:[#6954ff]">First Link</a>
      <a className="mr-5 hover:[#6954ff]">First Link</a>
    </nav>
    <div className='gap-5 flex'>
        <button className="inline-flex items-center bg-[#6954ff] border-0 py-1 px-3 focus:outline-none cursor-pointer text-white font-bold rounded text-base mt-4 md:mt-0">Log In
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
    <button className="inline-flex items-center bg-[#6954ff] border-0 py-1 px-3 focus:outline-none cursor-pointer text-white font-bold rounded text-base mt-4 md:mt-0">Register
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
    </div>
  </div>
</header>

    </div>
  )
}

export default Header