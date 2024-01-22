import clsx from 'clsx';

import menuItems from '../content/menu.json';
import classes from './Navigator.module.scss';

type NavigatorButtonProps = {
  type: string;
  handleClick?: () => void;
};

type NavigatorProps = {
  isMenuMode: boolean;
  currentSectionIndex: number;
  sectionsRef: React.RefObject<HTMLDivElement>;
  setMenuMode: (isMenuMode: boolean) => void;
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

const scrollToSection = (
  sectionsRef: React.RefObject<HTMLDivElement>,
  targetSectionIndex: number
) => {
  if (!sectionsRef.current) return;
  const targetSection = sectionsRef.current.children[targetSectionIndex];
  if (!(targetSection instanceof HTMLElement)) return;
  sectionsRef.current.scrollTo(0, targetSection.offsetTop);
};

const Navigator = ({
  isMenuMode,
  currentSectionIndex,
  sectionsRef,
  setMenuMode,
}: NavigatorProps) => {
  const navigatorClass = clsx(
    classes.navigator,
    !isMenuMode && classes.visible,
    classes[menuItems[currentSectionIndex].label]
  );

  const handlePrevClick = () => {
    const targetSectionIndex = Math.max(0, currentSectionIndex - 1);
    scrollToSection(sectionsRef, targetSectionIndex);
  };

  const handleNextClick = () => {
    const targetSectionIndex = Math.min(
      menuItems.length - 1,
      currentSectionIndex + 1
    );
    scrollToSection(sectionsRef, targetSectionIndex);
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
