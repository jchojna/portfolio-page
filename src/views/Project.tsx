import clsx from 'clsx';

import Graphic from '../components/Graphic';
import ProjectFeatures from '../components/ProjectFeatures';
import ProjectLinks from '../components/ProjectLinks';
import ProjectStats from '../components/ProjectStats';
import TextGroup from '../components/groups/TextGroup';
import IconsList from '../components/icons/IconsList';
// import ListGroup from '../components/groups/ListGroup';

import classes from './Project.module.scss';

const Project = ({
  name,
  about,
  features,
  icons,
  fetchedData,
}: ProjectProps) => {
  const { created_at, updated_at, homepage, html_url } = fetchedData;
  return (
    <div id={name} className={clsx(classes.section, classes[name])}>
      <div className={clsx(classes.container, classes[name])}>
        <Graphic view={name} />
        <TextGroup title="About Project" projectName={name} content={about} />
        <ProjectFeatures
          projectName={name}
          title="Features"
          content={features}
        />
        <IconsList view={name} icons={icons} />
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
