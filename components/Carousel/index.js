import React from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import { throttle } from 'lodash';
import 'pure-react-carousel/dist/react-carousel.es.css';
import cx from 'classnames';
import styles from './Carousel.module.css';

const slides = [
  {
    image: '/img/about/image-billionoyster.jpg',
    description:
      'four people, knee deep in a river, frontmost person smiling and holding a basket full of oysters',
    title: 'Billion Oyster Project',
    body: (
      <p>
        The{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='https://www.billionoysterproject.org/'
        >
          Billion Oyster Project
        </a>{' '}
        of the New York Harbor School is teaching students to cultivate oysters,
        which naturally filter the river, with the goal of cultivating one
        billion oysters by 2030. Volunteer with the Billion Oyster Project! Work
        alongside staff and students to build oyster reef structures, prepare
        recycled shell for new oysters, sort and count baby oysters, and much
        more.
      </p>
    ),
  },
  {
    image: '/img/about/image-nywatertrails.jpg',
    title: 'New York Water Trail Association',
    description:
      'four people, knee deep in a river, frontmost person smiling and holding a basket full of oysters',
    body: (
      <p>
        New York Water Trail Association is a group of individuals who have
        taken it upon themselves to collect water samples and map water quality
        across the City where there is none. Volunteer to become a water quality
        sampler by contacting NYCWTA on their website{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='http://www.nycwatertrail.org'
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    image: '/img/about/image-riverkeeper.jpg',
    description: 'a 20-foot boat named riverkeeper',
    title: 'Riverkeeper',
    body: (
      <p>
        Riverkeeper is a member-supported watchdog organization dedicated to
        defending the Hudson River and its tributaries, and protecting the
        drinking water supply of more than nine million New York City and Hudson
        Valley residents. You can help promote healthy rivers by and make a
        difference by urging your New York State legislators to take actions to
        better the waters that surround us{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='https://www.riverkeeper.org/get-involved/take-action/'
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    image: '/img/about/image-newtoncreek.jpg',
    title: 'Newtown Creek Alliance',
    description: 'a 20-foot boat with the manhattan skyline behind it',
    body: (
      <p>
        Newtown Creek Alliance (NCA) is a community-based organization dedicated
        to restoring, revealing and revitalizing Newtown Creek, the waterbody
        that flows between Brooklyn and Queens and empties into the East River.
        In 2010 Newtown Creek was named a Superfund site by the U.S.
        Environmental Protection Agency, which means, the federal government has
        identified it as an area in need of cleanup due to its contamination by
        hazardous substances and pollutants. You can help through NCA’s{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='https://www.newtowncreekalliance.org/enforcement'
        >
          Eyes on the Creek
        </a>{' '}
        Program.
      </p>
    ),
  },
  {
    image: '/img/about/image-gowanuscanal.jpg',
    description:
      'a two person kayak, paddling in front of an overpass in the gowanus canal',
    title: 'Gowanus Canal Conservancy',
    body: (
      <p>
        Gowanus Canal Conservancy is dedicated to facilitating the development
        of a resilient, vibrant, open space network centered on the Gowanus
        Canal through activating and empowering community stewardship of the
        Gowanus Watershed. Each year over 1,000 volunteers take part in exciting
        and creative projects that expand green spaces in the Gowanus Watershed,{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='https://gowanuscanalconservancy.org/volunteer/'
        >
          find out more here!
        </a>
      </p>
    ),
  },
  {
    image: '/img/about/image-bronxalliance.jpg',
    description:
      'Four people in the middle of weeds that are taller than all of them. the rightmost person is leaning on a bird house',
    title: 'Bronx River Alliance',
    body: (
      <p>
        The Bronx River, is approximately 24 miles long, flows all the way from
        White Plains down to the East River and is the only freshwater river in
        NYC! The Bronx River Alliance (BRA) works to protect, improve and
        restore the Bronx River corridor. You can{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='http://bronxriver.org/volunteer'
        >
          support their efforts by volunteering
        </a>{' '}
        to plant trees, remove invasive species, or act as a bike ride marshall.
      </p>
    ),
  },
  {
    image: '/img/about/image-iec.jpg',
    description:
      'Person in waders taking a water sample from the edge of a river',
    title: 'Interstate Environmental Commission',
    body: (
      <p>
        The{' '}
        <a
          target='_BLANK'
          rel='noopener noreferrer'
          href='https://www.iec-nynjct.org'
        >
          Interstate Environmental Commission’s (IEC)
        </a>{' '}
        mission is to protect and enhance environmental quality through
        cooperation, regulation, coordination, and mutual dialogue between
        government and citizens in the Tri-State Region. IEC fosters: foster
        improved understanding of the condition of District waters through
        long-term and short-term ambient water quality monitoring surveys;
        provides member states with compliance assistance through inspections,
        monitoring and analyses; and facilitates dialogue and education on
        interstate water pollution issues with regional agencies, organizations
        and the public.
      </p>
    ),
  },
];

const getConfig = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

  if (width < 560) {
    return {
      naturalSlideWidth: 240,
      naturalSlideHeight: 350,
      visibleSlides: 1.5,
    };
  }

  if (width < 1200) {
    return {
      naturalSlideWidth: 240,
      naturalSlideHeight: 350,
      visibleSlides: 2.5,
    };
  }

  return {
    naturalSlideWidth: 350,
    naturalSlideHeight: 610,
    visibleSlides: 3.5,
  };
};

const CarouselSlide = ({ index, children }) => (
  <Slide
    className={styles.slideContainer}
    innerClassName={styles.slide}
    innerTag='div'
    index={index}
  >
    <div className={styles.image}>
      <img src={children.image} alt={children.description} />
    </div>
    <div className={styles.text}>
      <h4 className={styles.title}>{children.title}</h4>
      <div className={styles.body}>{children.body}</div>
    </div>
  </Slide>
);

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = throttle(this.onResize.bind(this), 1000 / 60);
    this.state = {
      config: getConfig(),
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
  }

  onResize() {
    const config = getConfig();
    this.setState({ config });
  }

  render() {
    const { config } = this.state;

    return (
      <div className={styles.container}>
        <CarouselProvider totalSlides={slides.length} {...config}>
          <Slider className={styles.slider} classNameTray={styles.tray}>
            {slides.map((slide, index) => (
              <CarouselSlide key={index} index={index}>
                {{
                  image: slide.image,
                  title: slide.title,
                  body: slide.body,
                  description: slide.description,
                }}
              </CarouselSlide>
            ))}
          </Slider>
          <div className={styles.buttons}>
            <ButtonBack className={cx(styles.button, styles.prev)}>
              &lt; Back
            </ButtonBack>
            <ButtonNext className={cx(styles.button, styles.next)}>
              More &gt;
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    );
  }
}

export default Carousel;
