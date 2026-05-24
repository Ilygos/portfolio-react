import Head from 'next/head';

import App from '../src/App';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BEAUMONT MAXENCE</title>
        <meta name="description" content="Maxence BEAUMONT's portfolio!!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="icon.png" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <App />
    </>
  );
}