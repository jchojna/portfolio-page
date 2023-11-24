import Icon from './Icon';

import classes from './IconList.module.scss';

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
