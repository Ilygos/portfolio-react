import Head from 'next/head';

import App from '../src/App';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BEAUMONT MAXENCE</title>
        <meta name="description" content="Maxence Beaumont - game programmer specialized in tools, gameplay systems, and AI-assisted engineering workflows." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#081420" />
        <meta property="og:title" content="BEAUMONT MAXENCE" />
        <meta property="og:description" content="Game tools, gameplay systems, and AI-assisted technical direction." />
        <link rel="icon" href="icon.png" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <App />
    </>
  );
}