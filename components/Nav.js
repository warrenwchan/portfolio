import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg';

const Nav = () => {
  return (
    <div className="flex flex-row justify-center items-center px-8 py-4">
      <div>
        <Link href="/" passHref>
          <Image src={logo} alt="Logo" className='w-24' />
        </Link>
      </div>
    </div>
  )
}

export default Nav;
