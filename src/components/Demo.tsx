import clsx from 'clsx';

import Carousel from 'nuka-carousel';
import img1 from '../assets/img/img1.png';
import img2 from '../assets/img/img2.png';
import img3 from '../assets/img/img3.png';
import classes from './Demo.module.scss';

type DemoProps = {
  projectName: string;
  demoUrl: string;
  repoUrl: string;
};

const Demo = ({ projectName, demoUrl, repoUrl }: DemoProps) => {
  return (
    <div className={classes.demo}>
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
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
      </Carousel>
      <div className={clsx(classes.links, classes[projectName])}>
        <a
          href={repoUrl}
          className={classes.link}
          target="_blank"
          rel="nofollow noreferrer"
          aria-label={`${projectName} app code`}
        >
          Code
        </a>
        <a
          href={demoUrl}
          className={classes.link}
          target="_blank"
          rel="nofollow noreferrer"
          aria-label={`${projectName} app demo`}
        >
          Demo
        </a>
      </div>
    </div>
  );
};

export default Demo;
