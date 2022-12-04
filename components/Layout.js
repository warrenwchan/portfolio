import Nav from './Nav';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../components/seo/SEOHead'
import {useTheme} from 'next-themes'

const Layout = ({ children, path }) => {
  const [menuState, setMenuState] = useState(false)
  const [currentPage, setCurrentPage] = useState("Portfolio")
  const router = useRouter()
  const {theme, setTheme} = useTheme()

  const handleMenuState = () => {
    if(window.innerWidth < 1024) {
      return setMenuState(!menuState)
    }
  }

  const closeMenu = () => {
    window.innerWidth < 1024 ? setMenuState(false) : null
  }

  useEffect(() => {
    setCurrentPage(path)
  }, [path])

  useEffect(()=> {
    window.innerWidth >= 1024 ? setMenuState(true) : null
    window.addEventListener('resize', ()=> {
      window.innerWidth < 1024 ? setMenuState(false) : setMenuState(true)
    })
  }, [])

  return (
    <>
      <SEOHead
        title={router.route === "/" ? "Warren Chan ・ Portfolio" : `Warren Chan ・ ${currentPage}`}
    	/>
      <main className={`h-screen overflow-hidden flex flex-col md:flex-row ${theme === 'dark' ? 'dark' : null} text-slate-800 dark:text-zinc-200`}>
        <div className={`lg:w-1/5 lg:min-w-[420px] w-full md:h-full md:absolute lg:static md:top-0 md:left-0 md:bottom-0 md:z-10 ${menuState ? "md:w-full bg-slate-200/50 backdrop-blur-[2px]" : "md:w-auto"}`}>
          <Nav
            menuState={menuState}
            closeMenu={closeMenu}
            handleMenuState={handleMenuState}
          />
        </div>
        <div className='w-full lg:w-4/5 h-full p-4 md:p-8 xl:pr-0 overflow-y-scroll overflow-x-hidden dark:bg-zinc-900 bg-slate-50 md:ml-24 lg:ml-0 transition-all duration-200 ease-in-out'>
          <div className="w-full lg:max-w-5xl mx-auto flex flex-col gap-y-32 my-[10vh] md:my-[20vh] dark:text-zinc-200 transition-all duration-200 ease-in-out">
            {children}
          </div>
        </div>
      </main>
    </>
  )
};

export default Layout;
