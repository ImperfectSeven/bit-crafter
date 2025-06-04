import { PROFESSIONS, TIERS } from "../../types/constants";
import { addProfessionRecipes } from "./utils";

export const huntingStationRecipes = addProfessionRecipes(PROFESSIONS.Hunting)
.add(TIERS.Tier1, [
    {
        recipeName: 'Sagi Output',
        outputs: [
            { itemName: 'Rough Raw Pelt', quantity: 2 },
            { itemName: 'Basic Raw Meat', quantity: 4 },
            { itemName: 'Rough Animal Hair', quantity: { min: 0, max: 1 } }
        ],
        effort: 50,
        ingredients: [{ itemName: 'Sagi Bird', quantity: 1 }]
    }
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Nubi Output',
        outputs: [
            { itemName: 'Simple Raw Pelt', quantity: 2 },
            { itemName: 'Simple Raw Meat', quantity: 4 },
            { itemName: 'Simple Animal Hair', quantity: { min: 0, max: 1 } }
        ],
        effort: 65,
        ingredients: [{ itemName: 'Nubi Goat', quantity: 1 }]
    }
]);