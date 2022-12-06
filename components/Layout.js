import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes'
import { Context } from '../lib/context/context'

import Nav from './Nav';
import SEOHead from '../components/seo/SEOHead'

const Layout = ({ children, path }) => {
  const router = useRouter()
  const [ currentPage, setCurrentPage ] = useState("Portfolio")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setCurrentPage(path)
  }, [path])

  return (
    <>
      <SEOHead
        title={router.route === "/" ? "Warren Chan ・ Portfolio" : `Warren Chan ・ ${currentPage}`}
    	/>
      <main className={`h-full flex flex-col md:flex-row md:items-stretch ${theme === 'dark' ? 'dark' : ""} text-slate-800 dark:text-zinc-200`}>
        <div className={`w-full md:w-[96px] lg:w-1/5 lg:min-w-[420px] /md:h-full sticky top-0 left-0 z-10 transition-all ease-in-out duration-200`}>
          <Nav />
        </div>
        <div className={`w-full lg:w-4/5 min-h-screen h-full p-4 md:p-8 xl:pr-0 //md:ml-24 lg:ml-0 dark:bg-zinc-900 bg-slate-50 transition-all duration-200 ease-in-out`}>
          <div className="w-full lg:max-w-5xl mx-auto flex flex-col gap-y-32 my-[10vh] md:my-[20vh] dark:text-zinc-200 transition-all duration-200 ease-in-out relative">
            {children}
          </div>
        </div>
      </main>
    </>
  )
};

export default Layout;
