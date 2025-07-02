import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import darkTheme from './styles/darkTheme';
import ItemSelector from './components/ItemSelector/ItemSelector';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = searchParams.get('item');
  const quantity = Number(searchParams.get('quantity')) || 1;

  const handleItemSelect = (itemId: string | null) => {
    if (itemId) {
      setSearchParams({ item: itemId, quantity: String(quantity) });
    } else {
      setSearchParams({});
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (selectedItem) {
      setSearchParams({
        item: selectedItem,
        quantity: String(newQuantity),
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crafting Helper
      </Typography>

      <ItemSelector setSelectedItem={handleItemSelect} selectedItem={selectedItem} />

      {selectedItem && (
        <Box mt={3}>
          <ItemDetail itemId={selectedItem} quantity={quantity} onQuantityChange={handleQuantityChange} />
        </Box>
      )}
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
