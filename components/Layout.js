import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Warren Portfolio</title>
    </Head>
    <main className="h-screen overflow-hidden flex flex-row">
      <Nav />
      <div className='h-full w-full p-8 overflow-y-scroll'>
        <div className="w-full">{children}</div>
      </div>
    </main>
  </>
);

export default Layout;
