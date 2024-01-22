import clsx from 'clsx';
import { useState } from 'react';

import Menu from './Menu';
import Navigator from './Navigator';

import classes from './Header.module.scss';

type HeaderProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const Header = ({ isMenuMode, setMenuMode, sectionsRef }: HeaderProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);

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
        sectionsRef={sectionsRef}
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
      />
      <Navigator
        isMenuMode={isMenuMode}
        currentSectionIndex={currentSectionIndex}
        sectionsRef={sectionsRef}
        setMenuMode={setMenuMode}
      />
    </div>
  );
};

export default Header;
