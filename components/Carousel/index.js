import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { throttle } from 'lodash'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './index.css'

const slides = [
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Billion Oyster Project',
    body: <p>The Billion Oyster Project of the New York Harbor School is teaching students to cultivate oysters, which naturally filter the river, with the goal of cultivating one billion oysters by 2030. Volunteer with the Billion Oyster Project!</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'New York Water Trails',
    body: <p>New York Water Trails is a group of individuals who have taken it upon themselves to collect water samples and map water quality across the City where there is none.  Volunteer to become a water quality sampler here.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Riverkeeper',
    body: <p>Riverkeepr is a nonprofit and government watchdog working to preserve and protect our waterways. You can help promote healthy rivers by and make a difference by urging your New York State legislators to take actions to better the waters that surround us here.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Newtown Creek Alliance',
    body: <p>TKTK.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Gowanus Canal Conservancy',
    body: <p>TKTK.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Bronx River Alliance',
    body: <p>TKTK.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Hudson River Foundation',
    body: <p>TKTK.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'NY/NJ Harbor Baykeeper',
    body: <p>TKTK.</p>
  },
  {
    image: '/static/img/about/pluspool-placeholder.jpg',
    title: 'Lamont-Doherty Earth Observatory',
    body: <p>TKTK.</p>
  }
]

const getConfig = () => {
  const width = (typeof window !== 'undefined') ? window.innerWidth : 1200

  if (width < 560) {
    return {
      naturalSlideWidth: 240,
      naturalSlideHeight: 350,
      visibleSlides: 1.5
    }
  }

  return {
    naturalSlideWidth: 350,
    naturalSlideHeight: 610,
    visibleSlides: 3.5
  }
}

const MySlide = ({ index, children }) => (
  <Slide
    className='slider__slide-container'
    innerClassName='slider__slide'
    innerTag='a'
    index={index}
  >
    <div className='slider__slide__image'>
      <img src={children.image} />
    </div>
    <div className='slider__slide__text'>
      <h4 className='slider__slide__title'>
        {children.title}
      </h4>
      <div className='slider__slide__body'>
        {children.body}
      </div>
    </div>
  </Slide>
)

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.onResize = throttle(this.onResize.bind(this), 1000 / 60)
    this.state = getConfig()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize, false)
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize, false)
  }

  onResize () {
    const config = getConfig()
    console.log(config)
    this.setState({ ...config })
  }

  render () {
    const { items } = this.props
    const isMobile = (typeof window !== 'undefined' && window.innerWidth < 560)

    const config = isMobile ? {
      naturalSlideWidth: 240,
      naturalSlideHeight: 350,
      visibleSlides: 1.2
    } : {
      naturalSlideWidth: 350,
      naturalSlideHeight: 610,
      visibleSlides: 3.5
    }

    return (
      <div>
        <CarouselProvider
          totalSlides={slides.length}
          {...config}
        >
          <Slider
            className='slider'
            classNameTray='slider__tray'
          >
            {slides.map((slide, index) => (
              <MySlide index={index}>
                {{
                  image: slide.image,
                  title: slide.title,
                  body: slide.body
                }}
              </MySlide>
            ))}

          </Slider>
          <div className='slider__buttons'>
            <ButtonBack className='slider__button slider__button--prev'>&lt;</ButtonBack>
            <ButtonNext className='slider__button slider__button--next'>&gt;</ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    )
  }
}

export default Carousel
