import React from 'react'
import logo from '../assets/favicon.ico'

const AuthLayouts = ({ children }) => {
  return (
    <>
        <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
          <img src={logo} alt='logo' width={60} height={60} />
          <h1 className='font-bold pl-3'>Вместе с Км</h1>
        </header>

        {children}
    </>
  )
}

export default AuthLayouts