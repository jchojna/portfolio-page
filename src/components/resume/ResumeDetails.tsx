import clsx from 'clsx';

import classes from './ResumeDetails.module.scss';

type ResumeDetailsProps = {
  label?: string;
  items: string[];
  description: string[] | undefined;
};

const ResumeDetails = ({ label, items, description }: ResumeDetailsProps) => {
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
      {description && <p className={classes.description}>{description}</p>}
    </div>
  );
};

export default ResumeDetails;
