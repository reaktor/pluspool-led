import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { dataFetchProcess } from '../helpers/dataLoader'
import content from '../content'
import { GA_TRACKING_ID } from '../helpers/constants'
import ProgressBar from '../components/ProgressBar'
import '../components/AboutSection/index.css'
import '../components/Carousel/index.css'
import '../components/DataRangePicker/index.css'
import '../components/Databar/index.css'
import '../components/DatabarItem/index.css'
import '../components/Graph/index.css'
import '../components/GraphTooltip/index.css'
import '../components/Graphs/index.css'
import '../components/GraphsDateFilter/index.css'
import '../components/Legend/index.css'
import '../components/Navbar/index.css'
import '../components/ProgressBar/index.css'
import '../components/SvgVisualization/index.css'
import '../components/TitleText/index.css'
import '../components/TitleTextTooltip/index.css'
import '../components/Tooltip/index.css'
import '../components/TooltipSource/index.css'
import '../pages/index.css'
import '../icons/Circle/index.css'
import '../icons/CloseCircle/index.css'

const Header = () => (
  <Head>
    <title>{content.social.title}</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' href='/static/favicon.ico' />
    <link rel='icon' href='/static/favicon.ico' />

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

    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-17668746-5' />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
      }}
    />
  </Head>
)

const PlusPoolApp = ({ Component, pageProps }) => {
  const [state, setState] = useState({ data: null })

  useEffect(() => {
    dataFetchProcess.start(data => setState({ data }))
  }, [setState]) // conform to React exhaustive-deps

  return (
    <div className='container' data-template={Component.displayName}>
      <Header />
      <Navbar />
      {
        state.data ? (<Component {...pageProps} {...state.data} />) : <ProgressBar />
      }
    </div>
  )
}

export default PlusPoolApp
