import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '../components/Home';
import styles from '../styles/home-page.module.scss';

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='manifest' href='manifest.json' />
        <title>Barcode Cam</title>
        <meta name='description' content='barcode scanner' />
        <link rel='icon' href='/scan.svg' />
      </Head>

      <Home />
    </div>
  );
};

export default HomePage;
