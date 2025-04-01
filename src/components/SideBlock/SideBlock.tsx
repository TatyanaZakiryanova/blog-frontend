import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import styles from './SideBlock.module.scss';
import { ISideBlockProps } from './types';

export const SideBlock = ({ title, children }: ISideBlockProps) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
