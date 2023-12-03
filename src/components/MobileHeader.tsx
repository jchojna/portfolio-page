import clsx from 'clsx';

import MobileMenu from './MobileMenu';
import Burger from './Burger';

import classes from './MobileHeader.module.scss';

type MobileHeaderProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const MobileHeader = ({
  isMenuMode,
  setMenuMode,
  sectionsRef,
}: MobileHeaderProps) => {
  const headerClass = clsx({
    [classes.pageHeader]: true,
    [classes.visible]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <div className={headerClass}>
      <MobileMenu
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
        sectionsRef={sectionsRef}
      />
      <Burger isMenuMode={isMenuMode} setMenuMode={setMenuMode} />
    </div>
  );
};

export default MobileHeader;
