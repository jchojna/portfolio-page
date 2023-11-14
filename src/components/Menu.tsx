import clsx from 'clsx';
import { useState } from 'react';

import { menuItems } from '../content/menu';

import menuSvg from '../assets/svg/menu.svg';

import classes from './Menu.module.scss';

const Menu = ({ isIntroVisible }) => {
  const [lastHovered, setLastHovered] = useState<number>(0);
  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isIntroVisible,
  });

  return (
    <nav className={menuClass}>
      <ul className={classes.menuList}>
        {lastHovered}
        {menuItems.map(({ label, width }, index) => {
          const viewBox = `0 0 ${width} 100`;
          const buttonClass = clsx(
            classes.menuButton,
            classes[label],
            classes.intro
          );
          return (
            <li
              key={label}
              className={classes.menuItem}
              onMouseEnter={() => setLastHovered(index)}
            >
              <button className={buttonClass}>
                <div className={classes.menuSvg}>
                  <svg className={classes.menuSvgText} viewBox={viewBox}>
                    <use href={`${menuSvg}#${label}`}></use>
                  </svg>
                  <svg
                    className={clsx(classes.menuSvgShadow, classes.visible)}
                    viewBox={viewBox}
                  >
                    <use href={`${menuSvg}#${label}-shadow`}></use>
                  </svg>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
