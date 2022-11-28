import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Warren Portfolio</title>
    </Head>
    <main className="h-screen overflow-hidden flex flex-row">
      <div className="w-1/5 min-w-[420px]">
        <Nav />
      </div>
      <div className='w-4/5 h-full pr-0 overflow-y-scroll bg-slate-50'>
        {children}
      </div>
    </main>
  </>
);

export default Layout;
