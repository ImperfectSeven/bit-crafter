import { type ItemRecipe } from "../../types";
import { blacksmithingItems } from "./blacksmithing";
import { buildings } from "./buildings";
import { carpentryItems } from "./carpentry";
import { cookingItems } from "./cooking";
import { farmingItems } from "./farming";
import { fishingItems } from "./fishing";
import { foragingItems } from "./foraging";
import { forestryItems } from "./forestry";
import { huntingItems } from "./hunting";
import { leatherWorkingItems } from "./leatherworking";
import { masonryItems } from "./masonry";
import { miningItems } from "./mining";
import { scholarItems } from "./scholar";
import { tailoringItems } from "./tailoring";


export const ItemData = {
    ...blacksmithingItems,
    ...buildings,
    ...carpentryItems,
    ...cookingItems,
    ...farmingItems,
    ...fishingItems,
    ...foragingItems,
    ...forestryItems,
    ...huntingItems,
    ...leatherWorkingItems,
    ...masonryItems,
    ...miningItems,
    ...scholarItems,
    ...tailoringItems,

} as const satisfies Record<string, ItemRecipe[]>;

export type ItemName = string;