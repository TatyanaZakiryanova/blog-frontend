import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { ConfirmDialogProps } from './types';
import Box from '@mui/material/Box';

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: 5 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children && <Typography>{children}</Typography>}</DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Выйти
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
