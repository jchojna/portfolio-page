import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import classes from './MenuBackground.module.scss';

type MenuBackgroundProps = {
  isMenuMode: boolean;
  backgroundSplit: number;
  activeView: string;
};

const MenuBackground = ({
  isMenuMode,
  backgroundSplit,
  activeView,
}: MenuBackgroundProps) => {
  const [isAnimated, setAnimated] = useState<boolean>(false);
  const backgroundTop = useRef<HTMLDivElement | null>(null);
  const backgroundBottom = useRef<HTMLDivElement | null>(null);

  const containerClass = clsx({
    [classes.container]: true,
    [classes.visible]: true,
  });

  useEffect(() => {
    if (isMenuMode) {
      // closing
      setAnimated(true);
      backgroundTop.current!.style.height = '50px';
      backgroundBottom.current!.style.top = `${window.innerHeight}px`;

      setTimeout(() => {
        backgroundTop.current!.style.height = `${backgroundSplit + 1}px`;
        backgroundBottom.current!.style.top = `${backgroundSplit - 1}px`;
      }, 0);
    } else {
      // opening
      setAnimated(false);
      backgroundTop.current!.style.height = `${backgroundSplit + 1}px`;
      backgroundBottom.current!.style.top = `${backgroundSplit - 1}px`;

      // TODO: refactor
      setTimeout(() => {
        setAnimated(true);
      }, 0);
      setTimeout(() => {
        backgroundTop.current!.style.height = '50px';
        backgroundBottom.current!.style.top = `${window.innerHeight}px`;
      }, 500);
      setTimeout(() => {
        setAnimated(false);
      }, 800);
    }
  }, [isMenuMode, backgroundSplit]);

  return (
    <div className={containerClass}>
      <div
        ref={backgroundTop}
        className={clsx(
          classes.background,
          classes.top,
          isAnimated && classes.animated,
          !isMenuMode && classes[activeView],
          isMenuMode && classes.menuMode
        )}
      ></div>
      <div
        ref={backgroundBottom}
        className={clsx(
          classes.background,
          classes.bottom,
          isAnimated && classes.animated
        )}
      ></div>
    </div>
  );
};

export default MenuBackground;
