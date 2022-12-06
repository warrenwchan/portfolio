import { useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../lib/context/context';

import bmcLogo from '../public/bmc-logo.png'
import bmcLogoYellow from '../public/bmc-logo-yellow.png'

const Footer = () => {
  const { state, dispatch } = useContext(Context)
  const { theme, setTheme } = useTheme()

  const toggleTheme = (theme) => {
    setTheme(theme)
    dispatch({
      type: "THEME_TOGGLE",
      payload: theme
    })
  }

  return (
    <div className='flex flex-row justify-between items-center'>
      <a href="https://www.buymeacoffee.com/warrenwchan" target="_blank" rel="noreferrer" >
        <Image src={bmcLogo} alt="Buy me a coffee!" width={32} height={32} loading="lazy" className='dark:hidden rounded transition-all duration-200 ease-in-out hover:scale-110 delay-200'/>
        <Image src={bmcLogoYellow} alt="Buy me a coffee!" width={32} height={32} loading="lazy" className='hidden dark:block rounded'/>
      </a>
      <button className='h-8 w-8' onClick={() => toggleTheme(state.theme === 'dark' ? 'light' : 'dark')}>
        <p className={`${state.theme === 'dark' ? 'rotate-180' : 'rotate-0'} transition-all duration-200 ease-in-out hover:scale-110 delay-200`}>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </p>
      </button>
    </div>
  )
}

export default Footer
