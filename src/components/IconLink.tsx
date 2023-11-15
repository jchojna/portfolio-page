import clsx from 'clsx';

import classes from './IconLink.module.scss';

import icons from '../assets/svg/icons.svg';

type IconLink = {
  details: {
    id: string;
    name: string;
    url: string;
    ariaLabel: string;
  };
  view: string;
};

const IconLink = ({ details, view }: IconLink): JSX.Element => {
  const iconClass = clsx(classes.icon, classes[view]);
  return (
    <li className={iconClass}>
      <a
        href={details.url}
        className={classes.link}
        target="_blank"
        rel="nofollow noreferrer"
        aria-label={details.ariaLabel}
      >
        <svg className={classes.svg} viewBox="0 0 200 200">
          <use href={`${icons}#${details.id}`}></use>
        </svg>
      </a>
      <span className={classes.name}>{details.name}</span>
    </li>
  );
};

export default IconLink;
