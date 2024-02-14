import clsx from 'clsx';
import { useContext } from 'react';

import menuItems from '../content/menu.json';
import { scrollToSection } from '../utils/utils';
import CurrentViewContext from '../views/CurrentViewContext';

import classes from './Navigator.module.scss';

type NavigatorButtonProps = {
  type: string;
  handleClick?: () => void;
};

type NavigatorProps = {
  isMenuMode: boolean;
  sectionsRef: React.RefObject<HTMLDivElement>;
  setMenuMode: (isMenuMode: boolean) => void;
  backgroundSection: string;
  setBackgroundSection: (backgroundSection: string) => void;
};

const NavigatorButton = ({ type, handleClick }: NavigatorButtonProps) => {
  return (
    <button
      className={clsx(classes.button, classes[type])}
      onClick={handleClick}
    >
      <span className={clsx(classes.icon, classes[type])}></span>
    </button>
  );
};

const Navigator = ({
  isMenuMode,
  sectionsRef,
  setMenuMode,
  setBackgroundSection,
}: NavigatorProps) => {
  const [currentSectionIndex] = useContext(CurrentViewContext);
  const navigatorClass = clsx(
    classes.navigator,
    !isMenuMode && classes.visible,
    classes[menuItems[currentSectionIndex].label]
  );

  const handlePrevClick = () => {
    const targetSectionIndex = Math.max(0, currentSectionIndex - 1);
    scrollToSection(sectionsRef, targetSectionIndex);
    setBackgroundSection(menuItems[targetSectionIndex].label);
  };

  const handleNextClick = () => {
    const targetSectionIndex = Math.min(
      menuItems.length - 1,
      currentSectionIndex + 1
    );
    scrollToSection(sectionsRef, targetSectionIndex);
    setBackgroundSection(menuItems[targetSectionIndex].label);
  };

  const handleBackClick = () => {
    setMenuMode(true);
  };

  return (
    <nav className={navigatorClass}>
      <NavigatorButton type="prev" handleClick={handlePrevClick} />
      <NavigatorButton type="next" handleClick={handleNextClick} />
      <NavigatorButton type="back" handleClick={handleBackClick} />
    </nav>
  );
};

export default Navigator;
