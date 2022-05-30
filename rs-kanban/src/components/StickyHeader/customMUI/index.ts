import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const PinkButton = styled(Button)<ButtonProps>(() => ({
  color: '#700b0b',
  backgroundColor: '#fbc8c4',
  '&:hover': {
    backgroundColor: '#FDBDBA',
  },
}));

export const PeachButton = styled(Button)<ButtonProps>(() => ({
  color: '#6f3500',
  backgroundColor: '#ffefb7',
  '&:hover': {
    backgroundColor: '#FFE5B4',
  },
}));
