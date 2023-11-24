import clsx from 'clsx';

import classes from './ProjectStats.module.scss';

type ProjectStatsProps = {
  projectName: string;
};

const ProjectStats = ({ projectName }: ProjectStatsProps) => {
  return (
    <table className={clsx(classes.stats, classes[projectName])}>
      <thead className={classes.header}>
        <tr>
          <th scope="col">category</th>
          <th scope="col">value</th>
        </tr>
      </thead>
      <tbody className={classes.body}>
        <tr className={classes.row}>
          <td className={classes.category}>Created:</td>
          <td className={classes.value}></td>
        </tr>
        <tr className={classes.row}>
          <td className={classes.category}>Last update:</td>
          <td className={classes.value}></td>
        </tr>
        <tr className={classes.row}>
          <td className={classes.category}>Total commits:</td>
          <td className={classes.value}></td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectStats;
