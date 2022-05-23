import { Modal, Box, Typography, Button, TextField, Stack } from '@mui/material';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { useState } from 'react';
import { ModalWindowProps } from '../interface/ModalWindowProps';
import { deleteTask, updateTask } from '../../../api/tasks';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store';
import { getTask, updateTaskIndicator } from '../../../features/task/taskSlice';

export const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { t } = useTranslation();
  const [openConfirmationModal, setConfirmationModal] = useState<boolean>(false);
  const { open, onClose, value } = props;
  const { id, userId, order, boardId, columnId, files, title, description } = value;

  const handleOpenConfirmationModal = () => setConfirmationModal(true);

  const deteleTask = () => {
    deleteTask(boardId, columnId, id);
    setConfirmationModal(false);
    onClose();
  };

  const dispatch = useAppDispatch();

  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>('');

  const handleEditTitle = () => {
    setEditTitle(true);
    setTitleValue(title);
  };
  const handleCloseEditTitle = () => setEditTitle(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);

  const [isEditDescription, setEditDescription] = useState<boolean>(false);
  const [descriptionValue, setDescriptionValue] = useState<string>('');

  const handleEditDescription = () => {
    setEditDescription(true);
    setDescriptionValue(description);
  };
  const handleCloseEditDescription = () => setEditDescription(false);
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescriptionValue(e.target.value);

  const bodyForUpdate = {
    order,
    userId,
    boardId,
    columnId,
    description,
    title,
  };

  const handleUpdateTitle = async () => {
    await updateTask(boardId, columnId, id, { ...bodyForUpdate, title: titleValue });
    dispatch(getTask({ ...props.value, title: titleValue }));
    handleCloseEditTitle();
    dispatch(updateTaskIndicator(titleValue));
  };

  const handleUpdateDescription = async () => {
    await updateTask(boardId, columnId, id, { ...bodyForUpdate, description: descriptionValue });
    dispatch(getTask({ ...props.value, description: descriptionValue }));
    handleCloseEditDescription();
    dispatch(updateTaskIndicator(descriptionValue));
  };

  const closeModal = () => {
    handleCloseEditTitle();
    handleCloseEditDescription();
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-card-task">
          {!isEditTitle ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              mb={2}
              height={48}
              onClick={handleEditTitle}
            >
              {title}
            </Typography>
          ) : (
            <Stack direction="row" spacing={2} mb={2} alignItems="center">
              <TextField
                variant="standard"
                label={t('task.newTitle')}
                defaultValue={title}
                onChange={handleChangeTitle}
              />
              <Button variant="outlined" sx={{ height: '30px' }} onClick={handleCloseEditTitle}>
                {t('buttons.cancel')}
              </Button>
              <Button variant="contained" sx={{ height: '30px' }} onClick={handleUpdateTitle}>
                {t('buttons.submit')}
              </Button>
            </Stack>
          )}

          {!isEditDescription ? (
            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
              height={48}
              onClick={handleEditDescription}
            >
              {description}
            </Typography>
          ) : (
            <Stack direction="row" spacing={2} mb={3} alignItems="center">
              <TextField
                variant="standard"
                label={t('task.newDescription')}
                defaultValue={description}
                onChange={handleChangeDescription}
              />
              <Button
                variant="outlined"
                sx={{ height: '30px' }}
                onClick={handleCloseEditDescription}
              >
                {t('buttons.cancel')}
              </Button>
              <Button variant="contained" sx={{ height: '30px' }} onClick={handleUpdateDescription}>
                {t('buttons.submit')}
              </Button>
            </Stack>
          )}
          <Typography variant="body2" component="div" color="text.secondary">
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
