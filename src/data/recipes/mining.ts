import { PROFESSIONS, TIERS } from "../../types/constants";
import { addProfessionRecipes } from "./utils";

export const miningStationRecipes = addProfessionRecipes(PROFESSIONS.Mining)
.add(TIERS.Tier1, [
    {
        recipeName: 'Ferralith Orce Piece',
        effort: 50,
        outputs: [{ itemName: 'Ferralith Ore Piece', quantity: 4 }],
        ingredients: [{ itemName: 'Ferralith Ore Chunk', quantity: 1 }],
    },
    {
        recipeName: 'Rough Pebbles Output',
        effort: 50,
        outputs: [
            { itemName: 'Rough Pebbles', quantity: { min: 8, max: 20 } },
            { itemName: 'Rough Braxite', quantity: { min: 0, max: 4 } }
        ],
        ingredients: [{ itemName: 'Rough Stone Chunk', quantity: 1 }],
    }
]);