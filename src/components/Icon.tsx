import clsx from 'clsx';

import classes from './Icon.module.scss';

const Icon = ({ view }) => {
  return (
    <li className={clsx(classes.item, classes[view])}>
      <div className={classes.icon}>
        <svg className={classes.svg} viewBox="0 0 200 200">
          <use href="assets/svg/icons.svg#html-1"></use>
        </svg>
        <svg
          className={clsx(classes.svg, classes.faded1)}
          viewBox="0 0 200 200"
        >
          <use href="assets/svg/icons.svg#html-2"></use>
        </svg>
        <svg
          className={clsx(classes.svg, classes.faded2)}
          viewBox="0 0 200 200"
        >
          <use href="assets/svg/icons.svg#html-3"></use>
        </svg>
      </div>
      <span className={classes.name}>html</span>
    </li>
  );
};

export default Icon;
