import Head from 'next/head';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [menuState, setMenuState] = useState(false)

  const handleMenuState = () => {
    return setMenuState(!menuState)
  }

  const closeMenu = () => {
    return setMenuState(false)
  }

  useEffect(()=> {
    window.innerWidth > 425 ? setMenuState(true) : null
    window.addEventListener('resize', ()=> {
      window.innerWidth <= 425 ? setMenuState(false) : setMenuState(true)
    })
 }, [])

  return (
    <>
      <Head>
        <title>Warren Portfolio</title>
      </Head>
      <main className="h-screen overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/5 md:min-w-[420px]">
          <Nav
            menuState={menuState}
            closeMenu={closeMenu}
            handleMenuState={handleMenuState}
          />
        </div>
        <div className='w-full md:w-4/5 h-full p-4 md:pr-0 overflow-y-scroll overflow-x-hidden bg-slate-50'>
          {children}
        </div>
      </main>
    </>
  )
};

export default Layout;
