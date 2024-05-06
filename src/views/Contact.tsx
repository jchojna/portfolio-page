import clsx from 'clsx';
import { useContext } from 'react';

import IconLink from '../components/icons/IconLink';
import contactDetails from '../content/contactDetails.json';
import menuItems from '../content/menu.json';
import { getViewLocation } from '../utils/utils';
import classes from './Contact.module.scss';
import CurrentViewContext from './CurrentViewContext';

const Contact = () => {
  const [currentView] = useContext(CurrentViewContext);

  const viewLocation = getViewLocation(
    currentView,
    'contact',
    menuItems.map((item) => item.label)
  );

  return (
    <div id="contact" className={clsx(classes.section, classes.contact)}>
      <div
        className={clsx(
          classes.container,
          classes.contact,
          viewLocation && classes[viewLocation]
        )}
      >
        <h2 className={clsx(classes.title, classes.large, classes.contact)}>
          Looking to bring my talents to an innovative team. Let's chat!
        </h2>
        <div className={classes.contactDetails}>
          {contactDetails.map((details, index) => (
            <IconLink
              key={index}
              details={details}
              view="contact"
              large={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
