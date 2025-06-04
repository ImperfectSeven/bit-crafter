import { STRUCTURES, TIERS } from '../../types/constants';
import { addStructureRecipes } from './utils';

export const kilnRecipes = addStructureRecipes(STRUCTURES.Kiln).add(TIERS.Tier1, [
    {
        recipeName: 'Fire Rough Brick',
        outputs: [{ itemName: 'Rough Brick', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Unfired Rough Brick', quantity: 1 },
            { itemName: 'Rough Wood Log', quantity: 1 }
        ]
    },
    {
        recipeName: 'Heat Pitch',
        outputs: [{ itemName: 'Pitch', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Tree Sap', quantity: 1 }
        ]
    },
    {
        recipeName: 'Melt Glass',
        outputs: [{ itemName: 'Rough Glass', quantity: 1 }],
        seconds: 5 * 60,
        ingredients: [
            { itemName: 'Basic Sand', quantity: 5 }
        ]
    }
]);
