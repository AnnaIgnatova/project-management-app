import { Modal, Box, Typography, Button, TextField, ButtonGroup } from '@mui/material';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { useState } from 'react';
import { ModalWindowProps } from '../interface/ModalWindowProps';
import { deleteTask, updateTask } from '../../../api/tasks';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store';
import { getTask } from '../../../features/task/taskSlice';

export const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { t } = useTranslation();
  const [openConfirmationModal, setConfirmationModal] = useState<boolean>(false);
  const { open, onClose, value } = props;
  const { id, userId, order, boardId, columnId, files } = value;

  const handleOpenConfirmationModal = () => setConfirmationModal(true);

  const deteleTask = () => {
    deleteTask(boardId, columnId, id);
    location.reload();
  };

  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector((state) => state.taskReduser.task);

  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(title);

  const handleEditTitle = () => {
    setEditTitle(true);
    setTitleValue(title);
  };
  const handleCloseEditTitle = () => setEditTitle(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);

  const [isEditDescription, setEditDescription] = useState<boolean>(false);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);

  const handleEditDescription = () => {
    setEditDescription(true);
    setDescriptionValue(description);
  };
  const handleCloseEditDescription = () => setEditDescription(false);
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescriptionValue(e.target.value);

  const handleUpdate = () => {
    const body = {
      order,
      userId,
      boardId,
      columnId,
      description: descriptionValue,
      title: titleValue,
    };
    handleCloseEditTitle();
    handleCloseEditDescription();
    updateTask(boardId, columnId, id, body);
    dispatch(getTask({ ...props.value, title: titleValue, description: descriptionValue }));
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
          {!isEditTitle ? (
            <Typography gutterBottom variant="h5" component="div" onClick={handleEditTitle}>
              {title}
            </Typography>
          ) : (
            <>
              <TextField label="Enter new Title" value={titleValue} onChange={handleChangeTitle} />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={handleCloseEditTitle}>{t('buttons.cancel')}</Button>
                <Button onClick={handleUpdate}>{t('buttons.submit')}</Button>
              </Box>
            </>
          )}

          {!isEditDescription ? (
            <Typography variant="body2" color="text.secondary" onClick={handleEditDescription}>
              {description}
            </Typography>
          ) : (
            <>
              <TextField
                label="Enter new Description"
                value={descriptionValue}
                onChange={handleChangeDescription}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={handleCloseEditDescription}>{t('buttons.cancel')}</Button>
                <Button onClick={handleUpdate}>{t('buttons.submit')}</Button>
              </Box>
            </>
          )}
          <Typography variant="body2" color="text.secondary">
            <div className="modal-card-task__file">
              {t('task.files')}: {files.length}
            </div>

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
            {t('task.btnDelete')}
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
