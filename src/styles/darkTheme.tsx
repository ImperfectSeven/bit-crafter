import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
    background: {
      default: '#222',
      paper: '#333',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
});

export default darkTheme;