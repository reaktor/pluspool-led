import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { fetchSamplesData } from '../helpers/dataLoader'

const Header = () => (
  <Head>
    <title>+POOL Lights</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' href='/static/favicon.ico' />
    <link rel='icon' href='/static/favicon.ico' />
    <link rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap'
    />
  </Head>
)

const updateTime = 10000

class PlusPoolApp extends App {
  constructor(props) {
    super(props)
    this.state = { data: props }
  }

  componentDidMount() {
    console.log("Begining data fetching.")
    setInterval((() => {
      console.log("Fetching new data ...")
        //fetchSamplesData().then(({ samples }) => {
        //  console.log("New data received. Loading ...")
        //  this.setState({ data: samples })
        //})
    }), updateTime)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Header />
        <Navbar />
        <Component {...pageProps} {...this.state.data} />
      </Container>
    )
  }
}

PlusPoolApp.getInitialProps = fetchSamplesData

export default PlusPoolApp
