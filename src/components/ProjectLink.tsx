import clsx from 'clsx';

import classes from './ProjectLink.module.scss';

type ProjectLinkProps = {
  projectName: string;
  url: string;
  label: string;
};

const ProjectLink = ({ projectName, url, label }: ProjectLinkProps) => (
  <a
    href={url}
    className={clsx(classes.link, classes[projectName])}
    target="_blank"
    rel="nofollow noreferrer"
    aria-label={`${projectName} app ${label}`}
  >
    {label}
  </a>
);

export default ProjectLink;
