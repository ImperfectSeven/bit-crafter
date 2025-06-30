import { ThemeProvider } from '@mui/material/styles'
import './App.css'
import { useState } from 'react';
import ItemSelector from './components/ItemSelector/ItemSelector';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { Box, Container, Typography } from '@mui/material';
import darkTheme from './styles/darkTheme';

function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Crafting Helper
        </Typography>

        <ItemSelector setSelectedItem={setSelectedItem} />

        {selectedItem && (
          <Box mt={3}>
            <ItemDetail itemId={selectedItem} />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App;
