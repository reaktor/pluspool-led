import AboutSection from '../../components/AboutSection';
import content from '../../content';

const About = () => {
  const aboutSection = (section, index) => (
    <>
      <AboutSection side={index % 2 === 0 ? 'left' : 'right'} {...section} />
    </>
  );

  return (
    <main className='page' data-template='about'>
      {content.about.sections.map(aboutSection)}
      <section className='about-credits'>
        <div className='about-credits__wrapper'>{content.about.credits}</div>
      </section>
    </main>
  );
};

About.displayName = 'AboutPage';

export default About;
