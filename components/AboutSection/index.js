import styles from './AboutSection.module.css';

const AboutSection = ({ side, image, title, body, cta, carousel }) => (
  <>
    <div className={styles.container} data-side={side}>
      {image && (
        <div className={styles.image}>
          <img src={`/static/img/about/${image}`} alt='' />
        </div>
      )}
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{body}</div>
        {cta}
      </div>
    </div>
    {carousel}
  </>
);

export default AboutSection;
