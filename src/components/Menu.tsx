import { menuItems } from '../content/menu';

import menuSvg from '../assets/svg/menu.svg';

import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        {menuItems.map(({ label, width }) => {
          const viewBox = `0 0 ${width} 100`;
          return (
            <li key={label} className={styles.menuItem}>
              <button className={styles.menuButton}>
                <div className={styles.menuSvg}>
                  <svg className={styles.menuSvgText} viewBox={viewBox}>
                    <use href={`${menuSvg}#${label}`}></use>
                  </svg>
                  <svg className={styles.menuSvgShadow} viewBox={viewBox}>
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
