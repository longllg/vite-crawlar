import { memo, useEffect } from 'react';
import styles from './index.module.less';
import Girl from './Girl';
import Bee from './Bee';
import Floor from './Floor';

const index = () => {
  useEffect(() => {
    console.log(2);
  }, []);
  return (
    <div className={styles.wrap}>
      <Floor />
    </div>
  );
};

export default memo(index);
