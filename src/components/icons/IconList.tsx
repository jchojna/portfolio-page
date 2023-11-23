import clsx from 'clsx';

import Icon from './Icon';

import classes from './IconList.module.scss';

type IconList = {
  view: string;
  icons: IconDetails[];
};

const IconList = ({ view, icons }: IconList) => {
  // const iconClass = clsx(classes.icon, classes[view]);
  return (
    <ul className={classes.icons}>
      {icons.map((icon, index) => (
        <Icon key={index} view={view} details={icon} />
      ))}
    </ul>
  );
};

export default IconList;
