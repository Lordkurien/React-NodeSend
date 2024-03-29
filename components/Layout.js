import Head from 'next/head';
import Header from './Header';

export default function Home({children}) {
  return (
    <>
      <Head>
        <title>Next/NodeSend</title>
      </Head>

      <div className='bg-gray-100 min-h-screen'>
        <div className='container mx-auto'>
            <Header />
            <main className='mt-20'>
                {children}
            </main>
        </div>
      </div>
    </>
  )
}
