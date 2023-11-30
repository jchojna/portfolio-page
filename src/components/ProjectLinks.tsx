import clsx from 'clsx';

import classes from './ProjectLinks.module.scss';

const ProjectLinks = ({ projectName, url }: ProjectLinksProps) => (
  <div className={clsx(classes.projectLinks, classes[projectName])}>
    <a
      href={url.repo}
      className={classes.link}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label={`${projectName} app code`}
    >
      Code
    </a>
    <a
      href={url.demo}
      className={classes.link}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label={`${projectName} app demo`}
    >
      Demo
    </a>
  </div>
);

export default ProjectLinks;
