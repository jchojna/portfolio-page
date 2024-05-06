import clsx from 'clsx';
import { Suspense, lazy, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import Graphic from '../components/Graphic';
import Loader from '../components/Loader';
import ProjectFeatures from '../components/ProjectFeatures';
import ProjectLink from '../components/ProjectLink';
import Tag from '../components/Tag';
import TextGroup from '../components/groups/TextGroup';
import IconsList from '../components/icons/IconsList';
import menuItems from '../content/menu.json';
import { getViewLocation } from '../utils/utils';
import CurrentViewContext from './CurrentViewContext';
import classes from './Project.module.scss';

const Globe = lazy(() => import('../components/Globe'));
const ProjectCarousel = lazy(() => import('../components/ProjectCarousel'));

type ProjectProps = {
  name: string;
  about: string[];
  features: {
    label: string;
    items: string[];
  }[];
  icons: IconDetails[];
  fetchedData: RepoObj;
  snapshots: string[];
  isIntroDone: boolean;
};

const Project = ({
  name,
  about,
  features,
  icons,
  fetchedData,
  snapshots,
  isIntroDone,
}: ProjectProps) => {
  const { created_at, updated_at, homepage, html_url } = fetchedData;
  const [currentView] = useContext(CurrentViewContext);
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const viewLocation = getViewLocation(
    currentView,
    name,
    menuItems.map((item) => item.label)
  );

  return (
    <div id={name} className={clsx(classes.section, classes[name])}>
      <Graphic view={name} />
      <div
        className={clsx(
          classes.container,
          viewLocation && !isMobile && classes[viewLocation]
        )}
      >
        <div className={clsx(classes.content)}>
          <TextGroup title="About Project" projectName={name} content={about} />
          <ProjectFeatures projectName={name} content={features} />
          <IconsList view={name} icons={icons} />
          <div className={classes.footer}>
            <div className={classes.links}>
              <ProjectLink projectName={name} url={html_url} label="Code" />
              <ProjectLink projectName={name} url={homepage} label="Demo" />
            </div>
            <div className={classes.tags}>
              <Tag projectName={name} label="Created" date={created_at} />
              <Tag projectName={name} label="Last update" date={updated_at} />
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          {isIntroDone && name !== 'glob3d' && (
            <ProjectCarousel snapshots={snapshots} />
          )}
        </Suspense>
        <Suspense fallback={<Loader />}>
          {isIntroDone && name === 'glob3d' && <Globe />}
        </Suspense>
      </div>
    </div>
  );
};

export default Project;
