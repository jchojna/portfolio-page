import clsx from 'clsx';

import Menu from './Menu';

import classes from './Header.module.scss';

type Header = {
  isIntro: boolean;
  setIntro: (isIntro: boolean) => void;
  currentSectionIndex: number;
  relativeTopOffset: number;
};

const Header = ({
  isIntro,
  setIntro,
  currentSectionIndex,
  relativeTopOffset,
}: Header) => {
  const headerClass = clsx({
    [classes.pageHeader]: true,
    [classes.visible]: true,
    [classes.intro]: isIntro,
  });

  return (
    <div className={headerClass}>
      <Menu
        isIntro={isIntro}
        setIntro={setIntro}
        currentSectionIndex={currentSectionIndex}
        relativeTopOffset={relativeTopOffset}
      />
    </div>
  );
};

export default Header;
