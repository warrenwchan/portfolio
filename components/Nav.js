import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

import gradientBlur from '../public/graident_blur.svg';
import icon from '../public/favicon.png';

const Nav = ({ menuState, closeMenu, handleMenuState }) => {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?&populate=projects`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <nav className={`p-4 py-8 md:p-8 md:h-full sticky top-0 flex flex-col justify-between bg-white ${menuState ? "min-h-screen h-full w-1/5 min-w-[420px] shadow-xl" : null} transition-all ease-out duration-100`}>
      <div className="flex flex-row justify-between items-center w-full">
        <Link href="/" onClick={closeMenu} className="flex flex-row justify-center items-center gap-1">
          <Image src={icon} alt="Warren Chan Icon" width={24} height={24} className="w-8 h-8 p-2 md:hidden"/>
          {
            menuState
            ? <h2 className="text-xl font-bold uppercase tracking-wider">Warren Chan</h2>
            : null
          }
        </Link>
        <button className='w-8 h-8 lg:hidden' onClick={handleMenuState}>
        {
          menuState
          ? <FontAwesomeIcon icon={faTimes} className="transition transform" />
          : <FontAwesomeIcon icon={faBars} className="transition transform" />
        }
        </button>
      </div>
      <div className={`flex flex-col justify-between h-full mt-4 ${menuState ? null : "hidden" }`}>
        <div className="flex flex-col justify-center items-start">
          <p className='text-sm text-slate-600 uppercase tracking-wider mb-2'>Front-end Web Developer ・ UI Designer</p>
          <p className='text-sm text-slate-600 uppercase tracking-wider'>Vancouver, BC</p>
        </div>
        <div className="flex flex-col items-start gap-y-2">
          <p className="text-2xl font-bold mb-4">Links</p>
          <Link href={`/`} className={`flex flex-row gap-x-2 mb-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${router.route === "/" ? "text-indigo-400 font-medium" : null}`}>Home</Link>
          {/* <Link href={`/resume`} className={`flex flex-row gap-x-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${router.route === "/resume" ? "text-indigo-400 font-medium" : null}`}>Resume</Link> */}
        </div>
        <div className="flex flex-col items-start gap-y-2">
          <p className="text-2xl font-bold mb-4">Projects</p>
          {
            !data ? null :
            data.data.map((category, i) => {
              return (
                <Link
                  href={`/${category.attributes.slug}`}
                  key={i}
                  className={`flex flex-row gap-x-2 pb-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${category.attributes.slug === router.query.category ? "text-indigo-400 font-medium" : null}`}
                  onClick={handleMenuState}
                >
                  <span>{category.id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
                  <span>__________</span>
                  <span>{category.attributes.name}</span>
                </Link>
              )
            })
          }
        </div>
        <div className="flex flex-col gap-y-16">
        </div>
        <Footer
          menuState={menuState}
          handleMenuState={handleMenuState}
        />
        <Image src={gradientBlur} alt="gradient blur asset" className="absolute -bottom-16 -left-16 rotate-180 opacity-40 scale-125 -z-10" />
      </div>
      <div className={`hidden lg:hidden ${menuState ? "hidden" : "md:block"}`}>
        <Image src={icon} alt="Warren Chan Icon" width={24} height={24} className="w-8 h-8 p-2"/>
      </div>
    </nav>
  )
}

export default Nav;
