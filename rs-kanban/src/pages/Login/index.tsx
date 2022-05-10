import './style.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Login: React.FC = () => {
  return (
    <div className="container-login">
      <div className="login__title">Login</div>
      <Box component="form" className="login__form">
        <div className="login__form-input">
          <TextField required id="outlined-required" label="Login" placeholder="Enter your login" />
        </div>
        <div className="login__form-input">
          <TextField
            required
            id="outlined-required"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <Button className="login__form-btn" variant="contained">
          Click
        </Button>
      </Box>
    </div>
  );
};
