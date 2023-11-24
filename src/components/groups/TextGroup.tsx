import clsx from 'clsx';

import BlockTitle from '../BlockTitle';

import classes from './Group.module.scss';

const TextGroup = ({ title, projectName, content }: TextGroupProps) => {
  return (
    <div className={clsx(classes.group, classes[projectName])}>
      <BlockTitle title={title} view={projectName} />
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
