import clsx from 'clsx';
import Carousel from 'nuka-carousel';

import classes from './ProjectCarousel.module.scss';

type ProjectCarouselProps = {
  snapshots: string[];
};

const ProjectCarousel = ({ snapshots }: ProjectCarouselProps) => {
  return (
    <div className={classes.projectCarousel}>
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

export default ProjectCarousel;
