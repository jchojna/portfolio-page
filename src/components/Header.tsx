import clsx from 'clsx';
import { useContext, useState } from 'react';

import CurrentViewContext from '../views/CurrentViewContext';
import Menu from './Menu';
import Navigator from './Navigator';

import classes from './Header.module.scss';

type HeaderProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
  setIndicatorRef: (indicatorRef: HTMLDivElement | null) => void;
};

const Header = ({
  isMenuMode,
  setMenuMode,
  sectionsRef,
  setIndicatorRef,
}: HeaderProps) => {
  const [backgroundSection, setBackgroundSection] = useState<string>('about');

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
        backgroundSection={backgroundSection}
        setBackgroundSection={setBackgroundSection}
        setIndicatorRef={setIndicatorRef}
      />
      <Navigator
        isMenuMode={isMenuMode}
        sectionsRef={sectionsRef}
        setMenuMode={setMenuMode}
        backgroundSection={backgroundSection}
        setBackgroundSection={setBackgroundSection}
      />
    </div>
  );
};

export default Header;
