import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/wc-logo-black.svg';

import bmcLogo from '../public/bmc-logo.png'

const Footer = ({ menuState, handleMenuState }) => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <a href="https://www.buymeacoffee.com/warrenwchan" target="_blank" rel="noreferrer" >
        <Image src={bmcLogo} alt="Buy me a coffee!" width={32} height={32} />
      </a>
    </div>
  )
}

export default Footer
