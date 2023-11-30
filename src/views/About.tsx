import clsx from 'clsx';

import about from '../content/about.json';

import contactDetails from '../content/contactDetails.json';
import BlockTitle from '../components/BlockTitle';
import IconLink from '../components/icons/IconLink';
import IconsList from '../components/icons/IconsList';

import classes from './About.module.scss';

const About = () => {
  return (
    <div id="about" className={clsx(classes.section, classes.about)}>
      <div className={clsx(classes.container, classes.about)}>
        <h2 className={clsx(classes.title, classes.large, classes.about)}>
          {about.title}
        </h2>

        <img
          src="assets/img/photo.jpg"
          className={classes.photo}
          alt="My photo"
        />

        <section className={classes.description}>
          <p className="tab__description about">{about.description}</p>
        </section>

        <div className={classes.contactDetails}>
          {contactDetails.map((details, index) => (
            <IconLink key={index} details={details} view="about" />
          ))}
        </div>

        <div className={clsx(classes.iconsGroup, classes.high)}>
          <BlockTitle title={about.highLevel.title} view="about" />
          <IconsList view="about" icons={about.highLevel.tech} />
        </div>

        <div className={clsx(classes.iconsGroup, classes.medium)}>
          <BlockTitle title={about.mediumLevel.title} view="about" />
          <IconsList view="about" icons={about.mediumLevel.tech} />
        </div>

        <div className={clsx(classes.iconsGroup, classes.low)}>
          <BlockTitle title={about.lowLevel.title} view="about" />
          <IconsList view="about" icons={about.lowLevel.tech} />
        </div>
      </div>
    </div>
  );
};

export default About;
