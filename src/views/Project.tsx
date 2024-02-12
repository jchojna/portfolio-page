import clsx from 'clsx';
import Carousel from 'nuka-carousel';
import { useContext } from 'react';
import img1 from '../assets/img/img1.png';
import img2 from '../assets/img/img2.png';
import img3 from '../assets/img/img3.png';

import Graphic from '../components/Graphic';
import ProjectFeatures from '../components/ProjectFeatures';
import ProjectLinks from '../components/ProjectLinks';
import ProjectStats from '../components/ProjectStats';
import TextGroup from '../components/groups/TextGroup';
import IconsList from '../components/icons/IconsList';
import menuItems from '../content/menu.json';
import { getViewLocation } from '../utils/utils';
import CurrentViewContext from './CurrentViewContext';
// import ListGroup from '../components/groups/ListGroup';

import classes from './Project.module.scss';

const Project = ({
  name,
  about,
  features,
  icons,
  fetchedData,
}: ProjectProps) => {
  const [currentView] = useContext(CurrentViewContext);
  const { created_at, updated_at, homepage, html_url } = fetchedData;

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
          classes[name],
          classes[viewLocation]
        )}
      >
        <TextGroup title="About Project" projectName={name} content={about} />
        <ProjectFeatures projectName={name} content={features} />
        <IconsList view={name} icons={icons} />
        <div className={classes.carousel}>
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
        </div>
        <ProjectLinks
          projectName={name}
          repoUrl={html_url}
          demoUrl={homepage}
        />
        <ProjectStats
          projectName={name}
          createdAt={created_at}
          updatedAt={updated_at}
        />
      </div>
    </div>
  );
};

export default Project;
