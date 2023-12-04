import clsx from 'clsx';

import graphics from '../assets/svg/graphics.svg';

import classes from './Graphic.module.scss';

type GraphicProps = {
  view: string;
};

const Graphic = ({ view }: GraphicProps) => {
  return (
    <div className={clsx(classes.graphic, classes[view])}>
      <svg className={classes.base} viewBox="0 0 512 512">
        <use href={`${graphics}#${view}-base`}></use>
      </svg>
      <svg className={classes.shadow} viewBox="0 0 512 512">
        <use href={`${graphics}#${view}-shadow`}></use>
      </svg>
    </div>
    // <div className={clsx(classes.graphic, classes[view])}>
    //   <svg className={classes.base} viewBox="0 0 512 612">
    //     <use href={`${graphics}#${view}-base`}></use>
    //   </svg>
    //   <svg className={classes.letter} viewBox="0 0 512 612">
    //     <use href={`${graphics}#${view}-letter`}></use>
    //   </svg>
    //   <svg
    //     className={clsx(classes.shadow, classes.tasktimerBase)}
    //     viewBox="0 0 512 612"
    //   >
    //     <use href={`${graphics}#${view}-shadow-base`}></use>
    //   </svg>
    //   <svg
    //     className={clsx(classes.shadow, classes.tasktimerLetter)}
    //     viewBox="0 0 512 612"
    //   >
    //     <use href={`${graphics}#${view}-shadow-letter`}></use>
    //   </svg>
    // </div>
  );
};

export default Graphic;
