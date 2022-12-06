import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../lib/context/context";

import Footer from './Footer';

import gradientBlur from '../public/graident_blur.svg';
import logoBlack from '../public/logo-black.svg';
import logoWhite from '../public/logo-white.svg';
import iconBlack from '../public/icon-black.svg';
import iconWhite from '../public/icon-white.svg';

const Nav = () => {
  const router = useRouter()
  const [ data, setData ] = useState(null)
  const { theme, setTheme } = useTheme()
  const { state, dispatch } = useContext(Context);

  const toggleMenu = () => {
    dispatch({
      type: "MENU_TOGGLE",
      payload: !state.menu,
    })
  }

  const toggleMenuClose = () => {
    dispatch({
      type: "MENU_TOGGLE",
      payload: false,
    })
  }

  useEffect(() => {
    if( state.menu === true ) {
      console.log("true")
      document.querySelector("body").classList.add("overflow-y-hidden")

    } else {
      console.log("false")
      document.querySelector("body").classList.remove("overflow-y-hidden")
    }
  })

  useEffect(()=> {
    window.innerWidth >= 1024 ? dispatch({type: "MENU_TOGGLE", payload: true}) : dispatch({type: "MENU_TOGGLE", payload: false})
    window.addEventListener('resize', ()=> {
      window.innerWidth < 1024 ? dispatch({type: "MENU_TOGGLE", payload: false}) : dispatch({type: "MENU_TOGGLE", payload: true})
    })
  }, [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?&populate=projects`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <nav className={`h-full md:h-screen w-full p-4 md:p-8 py-8 sticky top-0 flex md:flex-col justify-between bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-200 transition-all ease-in-out duration-200 ${state.menu ? "flex-col min-h-screen shadow-xl md:w-[420px]" : "flex-row md:w-auto"}`}>
      <div className="flex-none flex flex-row justify-between items-center w-full">
        <Link href="/" className="flex flex-row justify-center items-center gap-1">
          <Image src={theme === 'dark' ? iconWhite : iconBlack} alt="Warren Chan Icon" width={32} height={32} className="w-8 h-8 p-2 md:hidden" loading="lazy" onClick={() => toggleMenuClose()} />
          {
            state.menu
            ? <Image src={theme === 'dark' ? logoWhite : logoBlack} alt="Logo" className='w-20 lg:w-24 hidden md:block' loading="lazy" onClick={() => toggleMenuClose()}  />
            : null
          }
        </Link>
        <button className='w-8 h-8 lg:hidden' onClick={() => toggleMenu()}>
        {
          state.menu
          ? <FontAwesomeIcon icon={faTimes} className="transition transform" />
          : <FontAwesomeIcon icon={faBars} className="transition transform" />
        }
        </button>
      </div>
      <div className={`grow flex flex-col justify-between h-full mt-4 ${state.menu ? "" : "hidden lg:flex" }`}>
        <div className="flex flex-col justify-center items-start">
          <p className='text-sm tracking-wide mb-2 font-IMB'>Portfolio</p>
        </div>
        <div className="flex flex-col items-start gap-y-2 font-IMB">
          <p className="font-sans text-2xl font-bold mb-4 text-black dark:text-white">Links</p>
          <Link
            href={`/`}
            className={`flex flex-row gap-x-2 mb-2 text-sm tracking-wide hover:font-medium hover:text-acapulco-500 transition-all duration-200 ease-in-out ${router.route === "/" ? "text-acapulco-600 font-medium" : null}`}
          >
            Home
          </Link>
          <a href="mailto:w.warrenchan@gmail.com" className={`flex flex-row gap-x-2 mb-2 text-sm tracking-wide hover:font-medium hover:text-acapulco-500 transition-all duration-200 ease-in-out`}>
            Contact
          </a>
          <Link
            href="/resume.pdf"
            alt="alt text"
            locale={false}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row gap-x-2 text-sm hover:font-medium hover:text-acapulco-500 transition-all duration-200 ease-in-out`}
          >
            Resume
          </Link>
        </div>
        <div className="flex flex-col items-start gap-y-2 font-IMB">
          <p className="font-sans text-2xl font-bold mb-4 text-black dark:text-white">Projects</p>
          {
            !data ? null :
            data.data.map((category, i) => {
              return (
                <Link
                  href={`/${category.attributes.slug}`}
                  key={i}
                  className={`flex flex-row gap-x-2 pb-2 text-sm tracking-wide hover:font-medium hover:text-acapulco-500 transition-all duration-200 ease-in-out ${category.attributes.slug === router.query.category ? "text-acapulco-600 font-medium" : null}`}
                  onClick={() => toggleMenu()}
                >
                  <span className='font-bold'>{category.id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
                  <span className='tracking-[-2px]'>__________</span>
                  <span>{category.attributes.name}</span>
                </Link>
              )
            })
          }
        </div>
        <div className="flex flex-col gap-y-16">
        </div>
        <Footer />
        <Image src={gradientBlur} alt="gradient blur asset" className="absolute -top-24 -left-24 rotate-180 opacity-20 scale-125 -z-10" loading="lazy" />
      </div>
      <div className={`hidden lg:hidden ${state.menu ? "hidden" : "md:block"}`}>
        <Image src={theme === 'dark' ? iconWhite : iconBlack} alt="Warren Chan Icon" width={24} height={24} className="w-8 h-8 p-2" loading="lazy"/>
      </div>
    </nav>
  )
}

export default Nav;
