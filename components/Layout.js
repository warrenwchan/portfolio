import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Warren Portfolio</title>
    </Head>
    <Nav />
    <main className="px-4">
      <div className="max-w-4xl mx-auto">
        <div className="">{children}</div>
      </div>
    </main>
  </>
);

export default Layout;
