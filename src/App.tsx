import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'
import { useState } from 'react';
import ItemSelector from './components/ItemSelector/ItemSelector';
import { SelectedItemContext } from './Context';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});


function App() {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Box width="600px" flex={1}>
        <SelectedItemContext.Provider value={selectedItem}>
          <Box width={"100%"} pb={5}>
            <ItemSelector setSelectedItem={setSelectedItem} />
          </Box>
          <Box width={"100%"} justifyContent="center">
            <ItemDetail />
          </Box>
        </SelectedItemContext.Provider>
      </Box>
    </ThemeProvider>
  )
}

export default App
