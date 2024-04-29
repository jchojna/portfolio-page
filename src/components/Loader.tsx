import { GridLoader } from 'react-spinners';

import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={classes.placeholder}>
      <GridLoader color="#ffffff80" size={20} />
    </div>
  );
};

export default Loader;
