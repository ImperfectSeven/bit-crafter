import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    primary: {
      main: '#90caf9', // optional, a nice blue
    },
    secondary: {
      main: '#f48fb1', // optional, soft pink
    },
  },
  typography: {
    allVariants: {
      color: '#ffffff',
    },
  },
});

export default darkTheme;
