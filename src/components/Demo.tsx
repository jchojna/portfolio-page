import clsx from 'clsx';

import Carousel from 'nuka-carousel';
import classes from './Demo.module.scss';

type DemoProps = {
  snapshots: string[];
};

const Demo = ({ snapshots }: DemoProps) => {
  return (
    <div className={classes.demo}>
      {snapshots.length > 0 && (
        <Carousel
          defaultControlsConfig={{
            prevButtonText: (
              <div className={clsx(classes.arrow, classes.left)}></div>
            ),
            nextButtonText: (
              <div className={clsx(classes.arrow, classes.right)}></div>
            ),
          }}
        >
          {snapshots.map((img, index) => (
            <img key={index} src={img} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Demo;
