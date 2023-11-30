import clsx from 'clsx';

import Menu from './Menu';
import MenuBackground from './MenuBackground';
import Burger from './Burger';

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
      <MenuBackground isMenuMode={isMenuMode} />
      <Menu
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
        currentSectionIndex={currentSectionIndex}
        offsetedSectionIndex={offsetedSectionIndex}
        relativeTopOffset={relativeTopOffset}
      />
      <Burger isMenuMode={isMenuMode} setMenuMode={setMenuMode} />
    </div>
  );
};

export default Header;
