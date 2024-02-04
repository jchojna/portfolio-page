import clsx from 'clsx';
import { useState } from 'react';

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
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
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
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
        setIndicatorRef={setIndicatorRef}
      />
      <Navigator
        isMenuMode={isMenuMode}
        currentSectionIndex={currentSectionIndex}
        sectionsRef={sectionsRef}
        setMenuMode={setMenuMode}
        backgroundSection={backgroundSection}
        setBackgroundSection={setBackgroundSection}
      />
    </div>
  );
};

export default Header;
