import { PROFESSIONS, TIERS } from '../../types/constants';
import { addProfessionRecipes } from './utils';

export const foragingRecipes = addProfessionRecipes(PROFESSIONS.Foraging)
.add(TIERS.Tier1, [
    {
        recipeName: 'Rough Plant Fiber',
        outputs: [{ itemName: 'Rough Plant Fiber', quantity: 100 }],
        effort: 50,
        ingredients: [
            { itemName: 'Rough Plant Roots', quantity: 1 }
        ]
    }
]);