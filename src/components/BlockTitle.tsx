import clsx from 'clsx';

import classes from './BlockTitle.module.scss';

const BlockTitle = ({ title, view, isLarge = false }: BlockTitleProps) => {
  return (
    <h3
      className={clsx(
        classes.blockTitle,
        classes[view],
        isLarge && classes.large
      )}
    >
      {title}
    </h3>
  );
};

export default BlockTitle;
