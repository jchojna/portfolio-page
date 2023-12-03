import clsx from 'clsx';
import { useState } from 'react';

import Menu from './Menu';
import MenuBackground from './MenuBackground';
import Burger from './Burger';

import classes from './Header.module.scss';

type HeaderProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const Header = ({ isMenuMode, setMenuMode, sectionsRef }: HeaderProps) => {
  const [backgroundSplit, setBackgroundSplit] = useState<number>(0);

  const headerClass = clsx({
    [classes.pageHeader]: true,
    [classes.visible]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <div className={headerClass}>
      <MenuBackground
        isMenuMode={isMenuMode}
        backgroundSplit={backgroundSplit}
      />
      <Menu
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
        sectionsRef={sectionsRef}
        setBackgroundSplit={setBackgroundSplit}
      />
      <Burger isMenuMode={isMenuMode} setMenuMode={setMenuMode} />
    </div>
  );
};

export default Header;
