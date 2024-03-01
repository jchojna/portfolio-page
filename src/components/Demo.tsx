import clsx from 'clsx';

import Carousel from 'nuka-carousel';
import classes from './Demo.module.scss';

type DemoProps = {
  projectName: string;
  demoUrl: string;
  repoUrl: string;
  snapshots: string[];
};

const Demo = ({ projectName, demoUrl, repoUrl, snapshots }: DemoProps) => {
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
        {snapshots.map((img, index) => (
          <img key={index} src={img} />
        ))}
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
