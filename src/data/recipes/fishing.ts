import { PROFESSIONS, TIERS } from "../../types/constants";
import { addProfessionRecipes } from "./utils";

export const fishingStationRecipes = addProfessionRecipes(PROFESSIONS.Fishing)
.add(TIERS.Tier1, [
    {
        recipeName: 'Breezy Fin Darter Products',
        outputs: [
            { itemName: 'Breezy Fin Darter Filet', quantity: { min: 1, max: 2 } },
            { itemName: 'Basic Fish Oil', quantity: 1 }
        ],
        effort: 50,
        ingredients: [{ itemName: 'Breezy Fin Darter', quantity: 1 }]
    },
    {
        recipeName: 'Basic Chum',
        outputs: [{ itemName: 'Basic Chum', quantity: 1 }],
        effort: 100,
        ingredients: [
            { itemName: 'Breezy Fin Darter', quantity: 10 },
            { itemName: 'Basic Raw Meat', quantity: 5 }
        ]
    },
    {
        recipeName: 'Basic Bait and Shells',
        outputs: [
            { itemName: 'Basic Bait', quantity: 2 },
            { itemName: 'Crushed Rough Shells', quantity: { min: 0, max: 1 } }
        ],
        effort: 50,
        ingredients: [{ itemName: 'Moonlit Crawdad', quantity: 1 }]
    }
])
.add(TIERS.Tier2, [
    {
        recipeName: 'Emberfin Shiner Products',
        outputs: [
            { itemName: 'Emberfin Shiner Filet', quantity: { min: 1, max: 2 } },
            { itemName: 'Simple Fish Oil', quantity: 1 }
        ],
        effort: 65,
        ingredients: [{ itemName: 'Emberfin Shiner', quantity: 1 }]
    },
    {
        recipeName: 'Simple Chum',
        outputs: [{ itemName: 'Simple Chum', quantity: 1 }],
        effort: 150,
        ingredients: [
            { itemName: 'Emberfin Shiner', quantity: 10 },
            { itemName: 'Simple Raw Meat', quantity: 5 }
        ]
    },
    {
        recipeName: 'Simple Bait and Shells',
        outputs: [
            { itemName: 'Simple Bait', quantity: 2 },
            { itemName: 'Crushed Simple Shells', quantity: { min: 0, max: 1 } }
        ],
        effort: 65,
        ingredients: [{ itemName: 'Driftwood Crayfish', quantity: 1 }]
    }
]);