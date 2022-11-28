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
    window.innerWidth > 1024 ? setMenuState(true) : null
    window.addEventListener('resize', ()=> {
      window.innerWidth < 1024 ? setMenuState(false) : setMenuState(true)
    })
 }, [])

  return (
    <>
      <Head>
        <title>Warren Portfolio</title>
      </Head>
      <main className="h-screen overflow-hidden flex flex-col md:flex-row">
        <div className={`lg:w-1/5 lg:min-w-[420px] w-full md:h-full md:absolute lg:static md:top-0 md:left-0 md:bottom-0 md:z-10 ${menuState ? "md:w-full bg-slate-200/50 backdrop-blur-[2px]" : "md:w-auto"}`}>
          <Nav
            menuState={menuState}
            closeMenu={closeMenu}
            handleMenuState={handleMenuState}
          />
        </div>
        <div className='w-full lg:w-4/5 h-full p-4 md:pr-0 overflow-y-scroll overflow-x-hidden bg-slate-50 md:p-24'>
          {children}
        </div>
      </main>
    </>
  )
};

export default Layout;
