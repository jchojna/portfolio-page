import clsx from 'clsx';

import classes from './Group.module.scss';

const TextGroup = ({ title, projectName, content }: TextGroupProps) => {
  return (
    <div className={clsx(classes.group, classes[projectName])}>
      <h3 className={classes.heading}>{title}</h3>
      <ul className={classes.list}>
        {content.map((listItem, index) => (
          <li key={index} className={classes.listItem}>
            {listItem}
          </li>
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

export default TextGroup;
