import useItems from '../../hooks/useItems';
import { Autocomplete, TextField } from '@mui/material';


type ItemSelectorProps = {
    setSelectedItem: (value: string) => void;
}
const ItemSelector = (props: ItemSelectorProps) => {
    const { setSelectedItem } = props;

    const { items } = useItems();

    const handleSelectionChange = (_event: React.SyntheticEvent, value: string | null) => {
        const selectedItemName = value ?? '';
        setSelectedItem(selectedItemName);
    };

    return (
        <Autocomplete
            options={Object.keys(items).sort()}
            onChange={handleSelectionChange}
            renderInput={(params) => (<TextField {...params} label="Select an item..." variant="filled" />)}
            fullWidth
        />
    );
}

export default ItemSelector;