import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import classes from './MenuBackground.module.scss';

type MenuBackgroundProps = {
  isMenuMode: boolean;
  backgroundSplit: number;
};

const MenuBackground = ({
  isMenuMode,
  backgroundSplit,
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
      setAnimated(false);
      backgroundTop.current!.style.height = '50px';
      backgroundBottom.current!.style.top = `${window.innerHeight}px`;

      setTimeout(() => {
        setAnimated(true);
      }, 0);
      setTimeout(() => {
        backgroundTop.current!.style.height = `${backgroundSplit + 1}px`;
        backgroundBottom.current!.style.top = `${backgroundSplit - 1}px`;
      }, 500);
    } else {
      // opening
      setAnimated(false);
      backgroundTop.current!.style.height = `${backgroundSplit + 1}px`;
      backgroundBottom.current!.style.top = `${backgroundSplit - 1}px`;

      setTimeout(() => {
        setAnimated(true);
      }, 0);
      setTimeout(() => {
        backgroundTop.current!.style.height = '50px';
        backgroundBottom.current!.style.top = `${window.innerHeight}px`;
      }, 500);
    }
  }, [isMenuMode, backgroundSplit]);

  return (
    <div className={containerClass}>
      <div
        ref={backgroundTop}
        className={clsx(
          classes.background,
          classes.top,
          isAnimated && classes.animated
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
