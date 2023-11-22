import classes from './ProjectLinks.module.scss';

const ProjectLinks = ({ projectName, url }) => (
  <div className="repoLinks repoLinks--tasktimer">
    <a
      href={url.repo}
      className="repoLinks__link repoLinks__link--tasktimer"
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="TaskTimer app code"
    >
      Code
    </a>
    <a
      href={url.demo}
      className="repoLinks__link repoLinks__link--tasktimer"
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="TaskTimer app demo"
    >
      Demo
    </a>
  </div>
);

export default ProjectLinks;
