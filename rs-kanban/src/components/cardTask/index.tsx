import { Box, Button, Card, CardActionArea, CardContent, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { CardTaskProps } from './interface/cardTaskProps';
import './style.scss';

export const CardTask: React.FC<CardTaskProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { description, files, title, userId } = props.value;
  return (
    <>
      <Card sx={{ maxWidth: 245, marginBottom: 2 }} onClick={handleOpen}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Responsible: {userId}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
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
    </>
  );
};
