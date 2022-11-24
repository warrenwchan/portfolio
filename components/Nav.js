import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg';

const Nav = () => {
  return (
    <div className="flex flex-row justify-between items-center px-4 py-2">
      <div>
        <Link href="/" passHref>
          <Image src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="flex flex-ro gap-x-2">
        <li>
          <Link href="/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/">
            Page 2
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav;
