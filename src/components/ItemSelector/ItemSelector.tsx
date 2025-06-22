import useRecipes from '../../hooks/useRecipes';
import { Autocomplete, TextField } from '@mui/material';


type ItemSelectorProps = {
    setSelectedItem: (value: string) => void;
}
const ItemSelector = (props: ItemSelectorProps) => {
    const { setSelectedItem } = props;

    const { recipes } = useRecipes();

    const handleSelectionChange = (_event: React.SyntheticEvent, value: string | null) => {
        const selectedItemName = value ?? '';
        setSelectedItem(selectedItemName);
    };

    return (
        <Autocomplete
            options={[...new Set(recipes.map((recipes) => recipes.outputs.map((output) => output.itemName)).flat())].sort()}
            onChange={handleSelectionChange}
            renderInput={(params) => (<TextField {...params} label="Select an item..." variant="filled" />)}
        />
    );
}

export default ItemSelector;