import clsx from 'clsx';

import Menu from './Menu';

import classes from './Header.module.scss';

type Header = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  currentSectionIndex: number;
  offsetedSectionIndex: number;
  relativeTopOffset: number;
};

const Header = ({
  isMenuMode,
  setMenuMode,
  currentSectionIndex,
  offsetedSectionIndex,
  relativeTopOffset,
}: Header) => {
  const headerClass = clsx({
    [classes.pageHeader]: true,
    [classes.visible]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <div className={headerClass}>
      <Menu
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
        currentSectionIndex={currentSectionIndex}
        offsetedSectionIndex={offsetedSectionIndex}
        relativeTopOffset={relativeTopOffset}
      />
      <button className={classes.burger}>
        <svg className="burgerButton__svg" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="10"></rect>
          <rect x="20" y="45" width="60" height="10"></rect>
          <rect x="20" y="70" width="60" height="10"></rect>
        </svg>
      </button>
    </div>
  );
};

export default Header;
