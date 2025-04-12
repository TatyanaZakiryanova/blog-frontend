import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { ConfirmDialogProps } from './types';

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmButton,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ textAlign: 'center' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ padding: 8 }}>
        {children && <Typography>{children}</Typography>}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
