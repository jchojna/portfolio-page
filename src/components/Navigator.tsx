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
  setMenuMode: (isMenuMode: boolean) => void;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
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
  setMenuMode,
  setCurrentSectionIndex,
}: NavigatorProps) => {
  const navigatorClass = clsx(
    classes.navigator,
    !isMenuMode && classes.visible,
    classes[menuItems[currentSectionIndex].label]
  );

  const handlePrevClick = () => {
    setCurrentSectionIndex(currentSectionIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentSectionIndex(currentSectionIndex + 1);
  };

  const handleBackClick = () => {
    setCurrentSectionIndex(0);
    setMenuMode(true);
  };

  return (
    <nav className={navigatorClass}>
      <NavigatorButton type="prev" />
      <NavigatorButton type="next" />
      <NavigatorButton type="back" handleClick={handleBackClick} />
    </nav>
  );
};

export default Navigator;
