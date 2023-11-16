import clsx from 'clsx';

import Icon from '../components/Icon';
import IconLink from '../components/IconLink';

import about from '../content/about.json';
import contactDetails from '../content/contactDetails.json';

import classes from './About.module.scss';

const About = () => {
  return (
    <div id="about" className={clsx(classes.section, classes.about)}>
      <div className={clsx(classes.container, classes.about)}>
        <h2 className={clsx(classes.heading, classes.large, classes.about)}>
          {about.title}
        </h2>

        <img src="assets/img/photo.jpg" className="photo" alt="My photo" />

        <section className="tab description">
          <p className="tab__description about">{about.description}</p>
        </section>

        <div className={classes.icons}>
          {contactDetails.map((details) => (
            <IconLink details={details} view="about" />
          ))}
        </div>

        <div className={classes.iconsGroup}>
          <h3 className={classes.title}>{about.goodKnowledge.title}</h3>
          <ul className={classes.icons}>
            {about.goodKnowledge.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>

        <div className={classes.iconsGroup}>
          <h3 className={classes.title}>{about.mediumKnowledge.title}</h3>
          <ul className={classes.icons}>
            {about.mediumKnowledge.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>

        <div className={classes.iconsGroup}>
          <h3 className={classes.title}>{about.lowKnowledge.title}</h3>
          <ul className={classes.icons}>
            {about.lowKnowledge.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
