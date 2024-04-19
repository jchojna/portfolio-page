import clsx from 'clsx';

import icons from '../../assets/svg/icons.svg';
import classes from './Icon.module.scss';

const Icon = ({ view, details }: IconProps) => {
  const { name, totalSVG } = details;
  const svgArray = Array.from({ length: totalSVG }, (_, index) => index + 1);

  return (
    <li className={clsx(classes.item, classes[view])}>
      <div className={classes.icon}>
        {svgArray.map((svg) => (
          <svg
            key={svg}
            className={clsx(classes.svg, svg > 1 && classes[`faded${svg - 1}`])}
            viewBox="0 0 200 200"
          >
            <use href={`${icons}#${name}-${svg}`}></use>
          </svg>
        ))}
      </div>
      <span className={classes.name}>{name}</span>
    </li>
  );
};

export default Icon;
