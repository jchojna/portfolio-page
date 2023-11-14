import clsx from 'clsx';

import Menu from './Menu';

import classes from './Header.module.scss';

type Header = {
  isIntroVisible: boolean;
};

const Header = ({ isIntroVisible }: Header) => {
  const headerClass = clsx({
    [classes.pageHeader]: true,
    [classes.visible]: true,
    [classes.intro]: isIntroVisible,
  });

  return (
    <div className={headerClass}>
      <Menu isIntroVisible={isIntroVisible} />
    </div>
  );
};

export default Header;
