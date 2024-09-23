import Link from 'next/link'
import Carousel from '../components/Carousel'

export default {
  sections: [
    {
      image: 'amoeba-forward@2x.png',
      title:
        'Water quality information is pretty complex and hard to digest...',
      body: (
        <p>
          That’s why we’ve designed this dashboard to explain what all the
          charts and spreadsheets mean. Our scientists have combed the data and
          created a system for understanding when its good, when it’s bad, and
          when it’s something in between.
        </p>
      ),
    },
    {
      image: 'amoeba-mission@2x.png',
      title:
        'We’re working to change the relationship with the water around us',
      body: (
        <p>
          We’re tracking water quality because we have a vision in which people
          that represent the full diversity of New York City are swimming in and
          around Manhattan safely, enjoying free and safe access to the river.
          We’re working on that vision everyday, and in the meantime, put design
          at the center of everything we do. Design is all around us and can be
          used to solve environmental problems, drive economic development, fuel
          innovation, teach kids, promote public health and help us understand
          things a little better, like this dashboard tries to do. Our project
          and programs recognize design’s ever-present impact on everybody.
        </p>
      ),
      cta: (
        <a className={'about-cta'} href='https://pluspool.org/donate/'>
          Donate to support our work!
        </a>
      ),
    },
    {
      image: 'amoeba-community@2x.png',
      title:
        'Citizens should be given the chance to help make their cities better.',
      body: (
        <p>
          + POOL is made up of an incredible group of people that are all
          working together to push for access to our rivers for swimming, and
          helping change our relationship with the water around us. Our friends
          send ideas, participate in programs, lend expertise, volunteer,
          support fundraising, and advocate for + POOL and the ideas generated
          by it.
        </p>
      ),
      cta: (
        <a className={'about-cta'} href='https://pluspool.org/pool/info/'>
          Join the movement!
        </a>
      ),
    },
    {
      side: 'left',
      title:
        'Learn about the communities that support the health of our waterways.',
      body: (
        <p>
          + POOL isn’t at it alone. There are tons of community groups in and
          around NYC who care about the state of our rivers and are fighting to
          help protect them and keep them clean. And you can help too!{' '}
        </p>
      ),
      carousel: <Carousel />,
    },
    {
      image: 'amoeba-jumpin@2x.png',
      title: 'It’s time to get to know your river better.',
      body: (
        <p>
          How warm was the water today? What’s turbidity? What’s pH? How is
          enterococci affect our ability to swim? Dive into the dashboard and
          find out!
        </p>
      ),
      cta: (
        <Link href='/' className={'about-cta'}>
          Go to the dashboard
        </Link>
      ),
    },
  ],
  credits: (
    <>
      <h2>Commissioned by Friends of + POOL, Inc.</h2>
      <section>
        <h3>Designers</h3>
        <ul>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='https://reaktor.com'
            >
              Reaktor Inc
            </a>
          </li>
          <li>Jonathan Dahan</li>
          <li>Ross Langley</li>
          <li>Savas Ozay</li>
          <li>Stephen Cronin</li>
        </ul>
      </section>
      <section>
        <h3>Sonde Installation</h3>
        <ul>
          <li>Rob Buchanan</li>
          <li>Wade McGillis</li>
          <li>Haokai Zhao</li>
        </ul>
      </section>
      <section>
        <h3>Lab Testing</h3>
        <ul>
          <li>Aaniyla Allen-Sutherland</li>
        </ul>
      </section>
      <section>
        <h3>Data Collection &amp; Analysis</h3>
        <ul>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='https://www.columbia.edu/'
            >
              Columbia University
            </a>
          </li>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='https://www.ldeo.columbia.edu/'
            >
              Lamont-Doherty Earth Observatory
            </a>
          </li>
          <li>Wade McGillis</li>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='http://www.mit.edu/'
            >
              Massachusetts Institute of Technology
            </a>
          </li>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='https://www.whoi.edu/'
            >
              Woods Hole Oceanographic Institution
            </a>
          </li>
          <li>Shawnee Taylor</li>
        </ul>
      </section>
      <section>
        <h3>Microbiology Early Warning ALERT Instrumentation</h3>
        <ul>
          <li>
            <a
              target='_BLANK'
              rel='noopener noreferrer'
              href='http://fluidion.com/en'
            >
              Fluidion
            </a>
          </li>
          <li>Dan Angelescu</li>
          <li>Andreas Hausot</li>
          <li>Joyce Wong</li>
        </ul>
      </section>
      <section>
        <p>
          Special thanks to{' '}
          <a
            target='_BLANK'
            rel='noopener noreferrer'
            href='https://billionoysterproject.org/'
          >
            Billion Oyster Project
          </a>{' '}
          for lending a boat,{' '}
          <a
            target='_BLANK'
            rel='noopener noreferrer'
            href='https://www.arup.com/'
          >
            Arup Engineering
          </a>{' '}
          for creating a lab, and Pier 35 for letting us sample.
        </p>
        <p>
          This project is supported in part by an award from the National
          Endowment for the Arts.
        </p>
      </section>
    </>
  ),
};
