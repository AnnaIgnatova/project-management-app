import { Modal, Box, Typography, Button } from '@mui/material';
import { ModalWindowProps } from '../interface/ModalWindowProps';

export const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { open, onClose, value } = props;
  const { id, description, title, userId, order, boardId, columnId, files } = value;
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-card-task">
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <div className="modal-card-task__file">Files: {files.length}</div>

          <div className="modal-card-task__file">
            {files.map((file, index) => {
              return <Button key={index}>{file.file}</Button>;
            })}
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};
