import clsx from 'clsx';

import classes from './Group.module.scss';

const ListGroup = ({ title, projectName, content }) => {
  return (
    <div className={clsx(classes.group, classes[projectName])}>
      <h3 className={classes.heading}>{title}</h3>
      <ul className={classes.paragraphs}>
        {content.map((paragraph) => (
          <li className={classes.paragraph}>{paragraph}</li>
        ))}
      </ul>
      {/* <button
        className="tab__readMore tab__readMore--tasktimer tab__readMore--js"
      >
        Read more
      </button> */}
    </div>
  );
};

export default ListGroup;
