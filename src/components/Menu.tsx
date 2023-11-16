import clsx from 'clsx';
import { useState } from 'react';

import { menuItems } from '../content/menu';
import MenuButton from './MenuButton';

import classes from './Menu.module.scss';

type MenuProps = {
  isIntro: boolean;
  setIntro: (isIntro: boolean) => void;
};

const Menu = ({ isIntro, setIntro }: MenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isIntro,
  });

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    setIntro(false);
  };

  return (
    <nav className={menuClass}>
      <ul className={classes.menuList}>
        {menuItems.map(({ label, width }, index) => {
          return (
            <li
              key={index}
              className={classes.menuItem}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => !isIntro && setHoveredItem(null)}
              onClick={() => handleItemClick(index)}
            >
              <MenuButton
                label={label}
                width={width}
                isHovered={hoveredItem === index}
                isActive={activeItem === index}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
