import clsx from 'clsx';
import { useState } from 'react';

import menuItems from '../content/menu.json';
import MenuButton from './MenuButton';

import classes from './Menu.module.scss';

type MenuProps = {
  isIntro: boolean;
  setIntro: (isIntro: boolean) => void;
  currentSectionIndex: number;
  offsetedSectionIndex: number;
  relativeTopOffset: number;
};

const Menu = ({
  isIntro,
  setIntro,
  currentSectionIndex,
  offsetedSectionIndex,
  relativeTopOffset,
}: MenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [indicatorTopOffset, setIndicatorTopOffset] = useState<number>(0);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isIntro,
  });

  return (
    <nav className={menuClass}>
      <div
        className={classes.indicator}
        style={{ top: `${indicatorTopOffset}px` }}
      ></div>
      <ul className={classes.menuList}>
        {menuItems.map(({ label, width }, index) => {
          return (
            <li
              key={index}
              className={classes.menuItem}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => !isIntro && setHoveredItem(null)}
              onClick={() => setIntro(false)}
            >
              <MenuButton
                label={label}
                width={width}
                isIntro={isIntro}
                isHovered={hoveredItem === index}
                isActive={currentSectionIndex === index}
                currentSectionIndex={currentSectionIndex}
                offsetedSectionIndex={offsetedSectionIndex}
                relativeTopOffset={relativeTopOffset}
                setIndicatorTopOffset={setIndicatorTopOffset}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
