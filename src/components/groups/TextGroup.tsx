import clsx from 'clsx';

import BlockTitle from '../BlockTitle';

import classes from './TextGroup.module.scss';

const TextGroup = ({ title, projectName, content }: TextGroupProps) => {
  return (
    <div className={clsx(classes.textBlock, classes[projectName])}>
      <BlockTitle title={title} view={projectName} />
      <ul className={clsx(classes.paragraphs, classes[projectName])}>
        {content.map((listItem, index) => (
          <li key={index} className={classes.paragraph}>
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
