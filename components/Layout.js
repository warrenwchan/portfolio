import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Warren Portfolio</title>
    </Head>
    <Nav />
    <main className="px-4">
      <div className="container mx-auto">
        <div className="">{children}</div>
      </div>
    </main>
  </>
);

export default Layout;
