import './style.scss';
import { Box, TextField, Button } from '@mui/material';

export const EditProfile: React.FC = () => {
  return (
    <div className="edit-profile-container">
      <Box
        component="form"
        className="edit-profile-form"
        onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}
      >
        <TextField placeholder="Enter your name" required />
        <TextField placeholder="Enter your login" required />
        <TextField type="password" placeholder="Enter your password" required />
        <Button variant="contained">Save Changes</Button>
      </Box>
      <Button variant="contained" color="error" style={{ width: '200px', marginBottom: '40px' }}>
        Delete account
      </Button>
    </div>
  );
};
