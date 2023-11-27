import clsx from 'clsx';

import contactDetails from '../content/contactDetails.json';

import classes from './Contact.module.scss';
import IconLink from '../components/icons/IconLink';

const Contact = () => {
  return (
    <div id="contact" className={clsx(classes.section, classes.contact)}>
      <div className={clsx(classes.container, classes.contact)}>
        <h2 className={clsx(classes.title, classes.large, classes.contact)}>
          Feel free to contact me! I'm open for new opportunities
        </h2>
        <div></div>;
        <div className={classes.contactDetails}>
          {contactDetails.map((details, index) => (
            <IconLink key={index} details={details} view="about" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
