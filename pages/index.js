import React from 'react'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Graphs from '../components/Graphs'
import Visualization from '../components/Visualization'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function IndexPage ({ stationData, noaaData }) {
  return (
    <div>
      <Head>
        <title>+Pool Light Installation</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Visualization noaaData={noaaData} stationData={stationData} />
      <section className='wrapper'>
        <h1>+Pool</h1>
      </section>
      <div className='spacer' />
      <section className='wrapper shaded-wrapper'>
        <h2>Graphs</h2>
        <Graphs noaaData={noaaData} stationData={stationData} />
      </section>
      <div className='spacer' />
      <section className='wrapper shaded-wrapper'>
        <h2>Bacteria</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien
          purus, volutpat at efficitur quis, suscipit at nibh. Nam nisi nunc,
          sollicitudin vitae arcu vel, fringilla pretium risus. Etiam et lacinia
          orci. Quisque malesuada, diam eu lacinia maximus, ipsum tellus iaculis
          ipsum, sit amet commodo arcu dui at turpis. Vivamus leo ex, malesuada
          non felis eu, feugiat semper ante. Morbi lacus velit, rhoncus id
          porttitor in, dignissim at odio. Donec in feugiat metus, eget suscipit
          metus. Sed egestas diam nulla, eget faucibus libero laoreet non.
          Praesent posuere quam sit amet mi mollis, a efficitur justo tincidunt.
          In at ante massa. Sed sem risus, malesuada vitae vulputate a, aliquam
          vel ex. Etiam quis quam at tellus bibendum condimentum vel sed augue.
          Praesent quis luctus arcu, sagittis dapibus mi.
        </p>

        <p>
          Donec lacinia quam sapien, sit amet bibendum risus ullamcorper at.
          Curabitur semper, sem non mattis suscipit, justo nunc pharetra nisi,
          sed faucibus velit urna sed magna. In malesuada tortor non tortor
          pellentesque viverra. In commodo ante ac libero volutpat dignissim.
          Aliquam non venenatis neque. Integer pharetra justo nisl, ut placerat
          urna hendrerit ut. Proin tristique sem ac nulla tincidunt egestas.
          Donec quis mauris feugiat ligula malesuada faucibus. Duis risus erat,
          scelerisque quis ultrices ac, ultrices vel lacus. Fusce leo nibh,
          consectetur sed sagittis sed, ornare nec libero. Donec rutrum eget
          nulla ut imperdiet. Mauris posuere fringilla risus, fringilla
          imperdiet quam ultricies in.
        </p>

        <p>
          Quisque tincidunt leo in leo sagittis, vitae accumsan erat vulputate.
          Nam bibendum diam id sapien pharetra, nec accumsan mauris molestie.
          Sed scelerisque eleifend mauris sed laoreet. Donec lacus mauris,
          efficitur at rutrum vel, convallis et ex. Ut velit ipsum, tempus quis
          rutrum sed, tincidunt interdum erat. Nulla facilisi. Morbi ac nisi in
          nisi varius vehicula sit amet ut massa. Interdum et malesuada fames ac
          ante ipsum primis in faucibus. Sed laoreet turpis id dignissim
          commodo.
        </p>
      </section>
      <div className='spacer' />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const rawStationData = await fetchStationData()
  const stationData = datagarrison.parse(rawStationData)

  const rawNoaaData = await fetchNoaaData()
  const noaaData = rawNoaaData.data

  return { stationData, noaaData }
}

export default IndexPage
