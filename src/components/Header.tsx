import clsx from 'clsx';

import Menu from './Menu';

import classes from './Header.module.scss';

type HeaderProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const Header = ({ isMenuMode, setMenuMode, sectionsRef }: HeaderProps) => {
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
      />
    </div>
  );
};

export default Header;
