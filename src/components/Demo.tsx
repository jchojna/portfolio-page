import clsx from 'clsx';
// @ts-expect-error types not available
import { BarGlob3d } from 'glob3d';
import Carousel from 'nuka-carousel';
import { useEffect, useRef, useState } from 'react';

import { getCitiesData } from '../utils/citiesData';
import classes from './Demo.module.scss';

type DemoProps = {
  projectName: string;
  snapshots: string[];
};

const Demo = ({ projectName, snapshots }: DemoProps) => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const data = getCitiesData();
  const [_globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);

  useEffect(() => {
    if (
      projectName === 'glob3d' &&
      globeRef.current &&
      globeRef.current.children.length === 0
    ) {
      setGlobeInstance(
        new BarGlob3d(globeRef.current, data, {
          tooltipValueSuffix: 'people',
          globeColor: '#048279',
          barColor: '#c2f3ef',
          barActiveColor: '#d29a21',
          tooltipActiveBackgroundColor: '#d29a21',
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      {/* {projectName === 'glob3d' && (
        <div className={classes.globe} ref={globeRef}></div>
      )} */}
    </div>
  );
};

export default Demo;
