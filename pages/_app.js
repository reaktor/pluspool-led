import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { dataFetchProcess } from '../helpers/dataLoader'

const Header = () => (
  <Head>
    <title>+ POOL Lights</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='shortcut icon' href='/static/favicon.ico' />
    <link rel='icon' href='/static/favicon.ico' />
  </Head>
)

// Populate loading shim (what shows for the brief moment before a load.
const Loading = () => (<></>)

class PlusPoolApp extends App {
  constructor (props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount () {
    dataFetchProcess.start(data => this.setState({ data }))
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <div className='container' data-template={Component.displayName}>
          <Header />
          <Navbar />
          {
            this.state.data === null ? <Loading />
              : (<Component {...pageProps} {...this.state.data} />)
          }
        </div>
      </Container>
    )
  }
}

PlusPoolApp.getInitialProps = null

export default PlusPoolApp
