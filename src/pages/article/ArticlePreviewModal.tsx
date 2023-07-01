import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ArticlePreview as ArticlePreviewType } from 'utils/models';
import ArticlePreview from './ArticlePreview';

export default function ArticlePreviewModal({
  article,
  open,
  setOpen,
}: {
  article: ArticlePreviewType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Box
          sx={{
            background: 'rgba(255,255,255, 0.6)',
          }}
        >
          <ArticlePreview article={article} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
