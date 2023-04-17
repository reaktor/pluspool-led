import React from 'react'
// import fetch from 'isomorphic-unfetch';
import { ENDPOINTS } from '../helpers/constants';

const PageWrapper = (Component) => {
  const wrappedComponent = (props) => <Component {...props} />

  return wrappedComponent
}


export const getStaticProps = async () => {
  const dataFetchParams = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' }
    // referrer: 'no-referrer'
  }

  try {
    const response = await fetch(ENDPOINTS.samples, dataFetchParams)
    const data = await response.json()
    return {
      props: {
        ...data
      }
    }
  } catch (err){
    console.log(err)
    throw new Error(`Request rejected with status ${err.status}`)
  }
}

export default PageWrapper