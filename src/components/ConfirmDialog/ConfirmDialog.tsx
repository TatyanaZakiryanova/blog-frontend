import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import styles from './ConfirmDialog.module.scss';
import { IConfirmDialogProps } from './types';

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmButton,
}: IConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.root}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={styles.content}>
        {children && <Typography>{children}</Typography>}
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
