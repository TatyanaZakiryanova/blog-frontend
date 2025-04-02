import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import styles from './Skeleton.module.scss';

export const PostSkeleton = () => {
  return (
    <div className={styles.root}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className={styles.content}>
          <div className={styles.user}>
            <Skeleton variant="circular" width={40} height={40} sx={{ marginRight: 10 }} />
            <div className={styles.userDetails}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>

          <div className={styles.info}>
            <Skeleton variant="text" width="80%" height={45} />
            <div className={styles.tags}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
