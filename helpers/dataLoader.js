import { ENDPOINTS } from './constants'
import fetch from 'isomorphic-unfetch'

const dataFetchParams = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
  referrer: 'no-referrer'
}

export const fetchSamplesData = () => fetch(ENDPOINTS.samples, dataFetchParams)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error(`Request rejected with status ${response.status}`)
  })
  .then(json => {
    if (!json.version) return { samples: json }
    return json
  })
