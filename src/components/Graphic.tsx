import clsx from 'clsx';

import graphics from '../assets/svg/graphics.svg';

import classes from './Graphic.module.scss';

type GraphicProps = {
  view: string;
};

const svgObj = (
  view: string,
  className: string,
  height: number = 512,
  width: number = 512
) => {
  return (
    <svg className={classes[className]} viewBox={`0 0 ${width} ${height}`}>
      <use href={`${graphics}#${view}-${className}`}></use>
    </svg>
  );
};

const Graphic = ({ view }: GraphicProps) => {
  return (
    <div className={clsx(classes.graphic, classes[view])}>
      {view === 'tasktimer' ? (
        <>
          {svgObj(view, 'base', 612)}
          {svgObj(view, 'shadow', 612)}
          {svgObj(view, 'letter', 612)}
          {svgObj(view, 'letterShadow', 612)}
        </>
      ) : (
        <>
          {svgObj(view, 'base')}
          {svgObj(view, 'shadow')}
        </>
      )}
    </div>
  );
};

export default Graphic;
