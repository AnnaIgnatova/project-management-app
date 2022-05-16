import { Modal, Box, Typography, Button } from '@mui/material';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { useState } from 'react';
import { ModalWindowProps } from '../interface/ModalWindowProps';
import { deleteTask } from '../../../api/tasks';

export const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const [openConfirmationModal, setConfirmationModal] = useState<boolean>(false);
  const { open, onClose, value } = props;
  const { id, description, title, userId, order, boardId, columnId, files } = value;

  const handleOpenConfirmationModal = () => setConfirmationModal(true);

  const deteleTask = () => {
    deleteTask(boardId, columnId, id);
    location.reload();
  };

  return (
    <>
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
              {files.map((file) => {
                return <Button key={id}>{file.file}</Button>;
              })}
            </div>
          </Typography>
          <Button
            color="error"
            className="modal-card-task__delete"
            onClick={handleOpenConfirmationModal}
          >
            Delete task
          </Button>
        </Box>
      </Modal>
      <ConfirmationModal
        open={openConfirmationModal}
        setOpenModal={setConfirmationModal}
        deleteFn={deteleTask}
        thingToBeRemoved="task"
      />
    </>
  );
};
