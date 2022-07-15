import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '../components/Home';
import styles from '../styles/home-page.module.scss';

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
          integrity='sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <title>Barcode Cam</title>
        <meta name='description' content='barcode scanner' />
        <link rel='icon' href='/scan.svg' />
      </Head>

      <Home />
    </div>
  );
};

export default HomePage;
