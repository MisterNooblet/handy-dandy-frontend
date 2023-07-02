import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ConfirmActionModal({
  open,
  setOpen,
  title,
  content,
  acceptBtnText,
  rejectBtnText,
  acceptAction,
  rejectAction,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  acceptBtnText: string;
  rejectBtnText: string;
  acceptAction: () => void;
  rejectAction?: () => void;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              if (rejectAction) {
                rejectAction();
              }
              handleClose();
            }}
          >
            {rejectBtnText}
          </Button>
          <Button
            onClick={() => {
              acceptAction();
              handleClose();
            }}
            autoFocus
          >
            {acceptBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}