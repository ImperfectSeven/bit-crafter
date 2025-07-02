import { itemData } from '../../data/item_data';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { type ItemData, TierNames, TierColors } from '../../types';

// Build filtered + sorted options
const itemOptions = Object.keys(itemData)
  .map((key) => ({ id: key, ...itemData[key] }))
  .filter((item) => item.recipes && item.recipes.length > 0)
  .sort((a, b) => a.tier - b.tier);

type ItemSelectorProps = {
  setSelectedItem: (value: string) => void;
  selectedItem: string | null;
};

const ItemSelector = ({ setSelectedItem, selectedItem }: ItemSelectorProps) => {
  const handleSelectionChange = (
    _event: React.SyntheticEvent,
    value: { id: string } & ItemData | null
  ) => {
    setSelectedItem(value?.id ?? '');
  };

  return (
    <Autocomplete
      options={itemOptions}
      value={itemOptions.find((o) => o.id === selectedItem) || null}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={handleSelectionChange}
      renderInput={(params) => (
        <TextField {...params} label="Select an item..." variant="filled" />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography sx={{ flexGrow: 1 }}>{option.name}</Typography>
          <Typography
            sx={{
              ml: 1,
              fontWeight: 'bold',
              color: TierColors[option.tier],
            }}
          >
            {TierNames[option.tier] ?? `Tier ${option.tier}`}
          </Typography>
        </Box>
      )}
      fullWidth
    />
  );
};

export default ItemSelector;
