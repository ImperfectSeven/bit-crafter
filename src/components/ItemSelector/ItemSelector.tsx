import { itemData } from '../../data/item_data';
import { Autocomplete, TextField } from '@mui/material';
import type { ItemData } from '../../types';

const itemOptions = Object.keys(itemData).map((key) => ({ id: key, ...itemData[key ]}));

type ItemSelectorProps = {
    setSelectedItem: (value: string) => void;
}
const ItemSelector = (props: ItemSelectorProps) => {
    const { setSelectedItem } = props;

    const handleSelectionChange = (_event: React.SyntheticEvent, value: {id: string} & ItemData | null) => {
        const selectedItemName = value?.id ?? '';
        console.log(`Selected item: ${selectedItemName}`);
        setSelectedItem(selectedItemName);
    };

    return (
        <Autocomplete
            options={itemOptions}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.name}
            onChange={handleSelectionChange}
            renderInput={(params) => (<TextField {...params} label="Select an item..." variant="filled" />)}
            fullWidth
        />
    );
}

export default ItemSelector;