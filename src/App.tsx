import { ThemeProvider } from '@mui/material/styles'
import './App.css'
import { useState } from 'react';
import ItemSelector from './components/ItemSelector/ItemSelector';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { Container, Typography } from '@mui/material';
import darkTheme from './styles/darkTheme';

function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Crafting Helper
        </Typography>

        <ItemSelector setSelectedItem={setSelectedItem} />

        {selectedItem && <ItemDetail itemName={selectedItem} />}
      </Container>
    </ThemeProvider>
  )
}

export default App
