import clsx from 'clsx';

import Menu from './Menu';
import MenuBackground from './MenuBackground';
import Burger from './Burger';

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
      <MenuBackground isMenuMode={isMenuMode} />
      <Menu
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
        sectionsRef={sectionsRef}
      />
      <Burger isMenuMode={isMenuMode} setMenuMode={setMenuMode} />
    </div>
  );
};

export default Header;
