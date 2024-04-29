import { useEffect, useRef, useState } from 'react';
// @ts-expect-error types not available
import { BarGlob3d } from 'glob3d';
import { getCitiesData } from '../utils/citiesData';
import classes from './Globe.module.scss';

const Globe = () => {
  const [_globeInstance, setGlobeInstance] = useState<BarGlob3d | null>(null);
  const globeRef = useRef<HTMLDivElement | null>(null);
  const data = getCitiesData();

  useEffect(() => {
    if (globeRef.current && globeRef.current.children.length === 0) {
      setGlobeInstance(
        new BarGlob3d(globeRef.current, data, {
          tooltipValueSuffix: 'people',
          globeColor: '#120e36',
          barColor: '#b4afe8',
          barActiveColor: '#e5a110',
          tooltipActiveBackgroundColor: '#e5a110',
        })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={classes.globe} ref={globeRef}></div>;
};

export default Globe;
