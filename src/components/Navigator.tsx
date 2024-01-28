import clsx from 'clsx';

import menuItems from '../content/menu.json';
import classes from './Navigator.module.scss';
import { scrollToSection } from '../utils/utils';

type NavigatorButtonProps = {
  type: string;
  handleClick?: () => void;
};

type NavigatorProps = {
  isMenuMode: boolean;
  currentSectionIndex: number;
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
  currentSectionIndex,
  sectionsRef,
  setMenuMode,
  setBackgroundSection,
}: NavigatorProps) => {
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
