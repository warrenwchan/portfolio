import Link from 'next/link';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Image from 'next/image';

import gradientBlur from '../public/graident_blur.svg'

const Nav = () => {
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
    <nav className="p-8 min-h-screen h-full sticky top-0 flex flex-col justify-between bg-slate-50/0">
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-xl font-bold uppercase tracking-wider">Warren Chan</h2>
        <p className='text-sm text-slate-600 uppercase tracking-wider mb-2'>Front-end Web Developer ・ UI Designer</p>
        <p className='text-sm text-slate-600 uppercase tracking-wider'>Vancouver, BC</p>
      </div>
      <div className="flex flex-col items-start gap-y-2">
        <p className="text-2xl font-bold">Links</p>
        <Link href={`/`} className={`flex flex-row gap-x-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${router.route === "/" ? "text-indigo-400 font-medium" : null}`}>Home</Link>
        <Link href={`/resume`} className={`flex flex-row gap-x-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${router.route === "/resume" ? "text-indigo-400 font-medium" : null}`}>Resume</Link>
      </div>
      <div className="flex flex-col items-start gap-y-2">
        <p className="text-2xl font-bold">Projects</p>
        {
          !data ? null :
          data.data.map((category, i) => {
            return (
              <Link href={`/${category.attributes.slug}`} key={i} className={`flex flex-row gap-x-2 text-slate-600 text-sm hover:font-medium hover:text-indigo-500 transition-all duration-500 ease-in-out ${category.attributes.slug === router.query.category ? "text-indigo-400 font-medium" : null}`}>
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
      <Footer />
      <Image src={gradientBlur} alt="gradient blur asset" className="absolute -bottom-16 -left-16 rotate-180 opacity-40 scale-125 -z-10" />
    </nav>
  )
}

export default Nav;
