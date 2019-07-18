import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'

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

class PlusPoolApp extends App {
  render() {
    console.log("Rendering outer layer.")
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Header />
        <Navbar />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default PlusPoolApp
