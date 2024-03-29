import CurvedArrow from '../icons/CurvedArrow'

export default {
  titleName: '+ POOL',
  titleDescription: 'Water Quality Dashboard',
  links: [
    {
      label: 'Dashboard',
      pathname: '/'
    },
    {
      label: 'Data',
      pathname: '/data'
    },
    {
      label: 'About',
      pathname: '/about'
    },
    {
      label: '+ POOL',
      pathname: 'https://pluspool.org/pool/',
      icon: <CurvedArrow />
    }
  ]
}
