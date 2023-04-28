import Head from 'next/head'
import Navbar from '../components/Navbar'
import content from '../content'
import { GA_TRACKING_ID } from '../helpers/constants';
import Script from 'next/script'
import './global.css';


const Header = () => (
  <Head>
    <title>{content.social.title}</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' href='/favicon.ico' />
    <link rel='icon' href='/favicon.ico' />

    <meta property='og:type' content='website' />
    <meta property='og:url' content={content.social.url} />
    <meta property='og:title' content={content.social.title} />
    <meta property='og:description' content={content.social.description} />
    <meta property='og:image' content={content.social.imageUrl} />

    {/* Twitter meta tags */}
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:url' content={content.social.url} />
    <meta property='twitter:title' content={content.social.title} />
    <meta property='twitter:description' content={content.social.description} />
    <meta property='twitter:image' content={content.social.imageUrl} />
  </Head>
)

const GoogleAnalytics = () => (
  <>
    <Script async src='https://www.googletagmanager.com/gtag/js?id=UA-17668746-5' strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
    `}
    </Script>
  </>
)

const PlusPoolApp = ({ Component, pageProps }) => {
  return (
    <div className='container' data-template={Component.displayName}>
      <GoogleAnalytics />

      <Header />
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default PlusPoolApp
