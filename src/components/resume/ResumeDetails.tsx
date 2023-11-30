import clsx from 'clsx';

import classes from './ResumeDetails.module.scss';

const ResumeDetails = ({ label, items }: ResumeDetailsProps) => {
  return (
    <div className={classes.container}>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.details}>
        {items.map((item: string, index: number) => (
          <p
            key={index}
            className={clsx(classes.detail, classes[`detail-${index + 1}`])}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResumeDetails;
