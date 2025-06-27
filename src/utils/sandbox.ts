import { ItemData } from "../data/items";
import { buildRecipeTree, computeTotalsFromTree } from "./buildRecipeTree";

const item = ItemData['Rough Wispweave Filament'];
console.dir(item, { depth: null });

const tree = buildRecipeTree("Rough Cloth", 1);
console.dir(tree, { depth: null });

const totals = computeTotalsFromTree(tree);
console.dir(totals, { depth: null });