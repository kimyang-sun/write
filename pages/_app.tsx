import React from 'react';
import AppLayout from 'components/AppLayout';
import Head from 'next/head';

type AppProps = {
  Component: React.ElementType;
};

function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="마음을 적는 공간" />
        <title>쓰다 - 마음을 적는 공간</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
}

export default App;
