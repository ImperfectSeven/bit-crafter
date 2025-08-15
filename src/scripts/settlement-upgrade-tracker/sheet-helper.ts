import { google } from "googleapis";
import { SheetResourceNames, SheetTiers, type Inventory, type ResourceSubmissionEntry, type SheetResourceName, type SheetTier, type StoredItem } from "./types.js";
import type { OAuth2Client } from 'googleapis-common';

/**
 * Writes the given data to the Resource Submission Logs tab of the specified Google Sheet.
 * @param data The data to write to the sheet.
 * @param params The parameters for authentication and sheet identification.
 */
export const writeToSheet = async (data: ResourceSubmissionEntry[], params: { GOOGLE_CREDENTIALS: string, SPREADSHEET_ID: string }) => {
    const { GOOGLE_CREDENTIALS, SPREADSHEET_ID } = params;

    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(GOOGLE_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient() as OAuth2Client;

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const sheetName = 'Resource Submission Logs';

    // Clear the existing data but leave the header row
    await sheets.spreadsheets.values.clear({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2:F`, // <-- Change range to adjust for your sheet
    });

    // Writes data to the given sheet
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2`, // <-- Change range to adjust for your sheet
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: data.map((r) => [
                r.time.toISOString(),
                r.name,
                r.resource,
                r.tier,
                r.quantity,
                r.note
            ]),
        },
    });
};

/** Set of regular expressions for matching item names that the sheet cares about */
const BaseRelevantItemRegexDictionary: Record<string, RegExp> = {
    // Base resources supported by the sheet
    Cloth: /^(?!Refined ).* Cloth$/,
    Leather: /^(?!Refined ).* Leather$/,
    Brick: /^(?!Refined ).* Brick$/,
    Ingot: /^(?!Refined ).* Ingot$/,
    Planks: /^(?!Refined ).* Plank$/,
    CitricBerry: /Citric Berry$/,
    Pebble: /Pebbles$/,
    Vial: /Glass Vial$/,
    WaterBucket: /^Water Bucket$/,
    Resin: /Resin$/,
    CropOil: /Crop Oil$/,
    Pitch: /Pitch$/,
    AnimalHair: /Animal Hair$/,
    Straw: /Straw$/,
    Braxite: /Braxite$/,
    FishOil: /Fish Oil$/,
    Gypsite: /Gypsite$/,
    Shell: /Crushed .* Shells$/,
    Parchment: /Parchment$/,
    Carving: /Stone Carvings$/,
    Pigment: /Pigment$/,
} as const;
type BaseRelevantItemKey = keyof typeof BaseRelevantItemRegexDictionary;

/** Extended set of regular expressions for matching item names that the sheet cares about, including refined materials and diagrams */
const AugmentedRelevantItemRegexDictionary: Record<string, RegExp> = {
    Diagram: /Stone Diagrams$/,
    RefinedCloth: /^Refined .* Cloth$/,
    RefinedLeather: /^Refined .* Leather$/,
    RefinedBrick: /^Refined .* Brick$/,
    RefinedIngot: /^Refined .* Ingot$/,
    RefinedPlanks: /^Refined .* Plank$/,
    PlankPackage: /^(?!Refined ).* Plank Package$/,
    ClothPackage: /^(?!Refined ).* Cloth Package$/,
    LeatherPackage: /^(?!Refined ).* Leather Package$/,
    BrickPackage: /^(?!Refined ).* Brick Package$/,
    IngotPackage: /^(?!Refined ).* Ingot Package$/,
    RefinedPlankPackage: /^Refined .* Plank Package$/,
    RefinedClothPackage: /^Refined .* Cloth Package$/,
    RefinedLeatherPackage: /^Refined .* Leather Package$/,
    RefinedBrickPackage: /^Refined .* Brick Package$/,
    RefinedIngotPackage: /^Refined .* Ingot Package$/,
} as const;
type AugmentedRelevantItemKey = keyof typeof AugmentedRelevantItemRegexDictionary;

/** Handles filtering out items that the sheet does not care about */
export const mapRelevantItemData = (data: Inventory): ResourceSubmissionEntry[] => {
    const relevantItems: ResourceSubmissionEntry[] = [];

    for (const [_storageId, storage] of Object.entries(data)) {
        if (shouldIgnoreStorage(storage.items)) continue; // Skip this storage
        for (const item of storage.items) {
            const { name } = item;
            let isBase = false;
            // Check if it matches any base items
            for (const [key, regex] of Object.entries(BaseRelevantItemRegexDictionary) as [BaseRelevantItemKey, RegExp][]) {
                if (regex.test(name)) {
                    isBase = true;
                    const mapped = mapBaseItem(item, key);
                    if (mapped) {
                        relevantItems.push({
                            time: new Date(),
                            name: storage.storageName,
                            ...mapped,
                        });
                    }
                    break; // Stop checking other base items
                }
            }
            if (isBase) continue; // If it was a base item, skip checking augmented items
            // Check if it matches any augmented items
            for (const [key, regex] of Object.entries(AugmentedRelevantItemRegexDictionary) as [AugmentedRelevantItemKey, RegExp][]) {
                if (regex.test(name)) {
                    const mappedItems = mapAugmentedItem(item, key);
                    if (mappedItems) {
                        relevantItems.push(...mappedItems.map((mapped) => ({
                            time: new Date(),
                            name: storage.storageName,
                            ...mapped,
                            note: `Already crafted into ${item.amount}x ${name}`,
                        })));
                    }
                    break; // Stop checking other augmented items
                }
            }
        }
    }

    return relevantItems;
};

const getSheetTier = (tier: number): SheetTier => tier === -1 ? SheetTiers[1] : SheetTiers[tier];

const mapBaseItem = (baseItem: StoredItem, type: BaseRelevantItemKey): Pick<ResourceSubmissionEntry, 'resource' | 'tier' | 'quantity'> | undefined => {
    const { amount, tier } = baseItem;
    let sheetResourceName: SheetResourceName | undefined = undefined;
    // Find which base item it is
    switch (type) {
        case 'Cloth':
            sheetResourceName = SheetResourceNames.Cloth;
            break;
        case 'Leather':
            sheetResourceName = SheetResourceNames.Leather;
            break;
        case 'Brick':
            sheetResourceName = SheetResourceNames.Brick;
            break;
        case 'Ingot':
            sheetResourceName = SheetResourceNames.Ingot;
            break;
        case 'Planks':
            sheetResourceName = SheetResourceNames.Plank;
            break;
        case 'CitricBerry':
            sheetResourceName = SheetResourceNames.CitricBerry;
            break;
        case 'Pebble':
            sheetResourceName = SheetResourceNames.Pebble;
            break;
        case 'Vial':
            sheetResourceName = SheetResourceNames.Vial;
            break;
        case 'WaterBucket':
            sheetResourceName = SheetResourceNames.WaterBucket;
            break;
        case 'Resin':
            sheetResourceName = SheetResourceNames.Resin;
            break;
        case 'CropOil':
            sheetResourceName = SheetResourceNames.CropOil;
            break;
        case 'Pitch':
            sheetResourceName = SheetResourceNames.Pitch;
            break;
        case 'AnimalHair':
            sheetResourceName = SheetResourceNames.AnimalHair;
            break;
        case 'Straw':
            sheetResourceName = SheetResourceNames.Straw;
            break;
        case 'Braxite':
            sheetResourceName = SheetResourceNames.Braxite;
            break;
        case 'FishOil':
            sheetResourceName = SheetResourceNames.FishOil;
            break;
        case 'Gypsite':
            sheetResourceName = SheetResourceNames.Gypsite;
            break;
        case 'Shell':
            sheetResourceName = SheetResourceNames.Shell;
            break;
        case 'Parchment':
            sheetResourceName = SheetResourceNames.Parchment;
            break;
        case 'Carving':
            sheetResourceName = SheetResourceNames.Carving;
            break;
        case 'Pigment':
            sheetResourceName = SheetResourceNames.Pigment;
            break;
    }

    if (!sheetResourceName) return undefined;

    if (getSheetTier(tier) === undefined) console.error(`Unknown tier mapping for item: ${baseItem.name} with tier ${tier}`, { baseItem });

    return { resource: sheetResourceName, tier: getSheetTier(tier), quantity: amount };
};

/** Takes an augmented item and quantity and returns the corresponding set of base items and quantities */
const mapAugmentedItem = (augmentedItem: StoredItem, type: AugmentedRelevantItemKey): Pick<ResourceSubmissionEntry, 'resource' | 'tier' | 'quantity'>[] => {
    const baseItems: Pick<ResourceSubmissionEntry, 'resource' | 'tier' | 'quantity'>[] = [];

    // Case statement to calculate base items and quantities based on the augmented item
    switch (type) {
        case 'Diagram':
            baseItems.push({ resource: SheetResourceNames.Carving, tier: getSheetTier(augmentedItem.tier), quantity: 1 * augmentedItem.amount });
            break;
        case 'RefinedCloth': {
            // Each tier requires 5 of the current tier's cloth, 1 animal hair, and 1 straw and then 2 of the previous tier's refined cloth
            // it is then recursive in that the refined cloth now needs 5 of the previous tier's cloth, 1 animal hair, and 1 straw etc.
            for (let t = 0; t < augmentedItem.tier; t++) {
                baseItems.push({ resource: SheetResourceNames.Cloth, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.AnimalHair, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Straw, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
            }
            break;
        }
        case 'RefinedLeather': {
            for (let t = 0; t < augmentedItem.tier; t++) {
                baseItems.push({ resource: SheetResourceNames.Leather, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Braxite, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.FishOil, tier: getSheetTier(augmentedItem.tier - t), quantity: 2 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Vial, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.WaterBucket, tier: SheetTiers[1], quantity: Math.pow(2, t) * augmentedItem.amount });
            }
            break;
        }
        case 'RefinedBrick': {
            for (let t = 0; t < augmentedItem.tier; t++) {
                baseItems.push({ resource: SheetResourceNames.Brick, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Gypsite, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Shell, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
            }
            break;
        }
        case 'RefinedIngot': {
            for (let t = 0; t < augmentedItem.tier; t++) {
                baseItems.push({ resource: SheetResourceNames.Ingot, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.CitricBerry, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Pebble, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Vial, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.WaterBucket, tier: SheetTiers[1], quantity: Math.pow(2, t) * augmentedItem.amount });
            }
            break;
        }
        case 'RefinedPlanks': {
            for (let t = 0; t < augmentedItem.tier; t++) {
                baseItems.push({ resource: SheetResourceNames.Plank, tier: getSheetTier(augmentedItem.tier - t), quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Resin, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.CropOil, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Pitch, tier: SheetTiers[1], quantity: 5 * Math.pow(2, t) * augmentedItem.amount });
                baseItems.push({ resource: SheetResourceNames.Vial, tier: getSheetTier(augmentedItem.tier - t), quantity: Math.pow(2, t) * augmentedItem.amount });
            }
            break;
        }
        case 'PlankPackage':
            baseItems.push({ resource: SheetResourceNames.Plank, tier: getSheetTier(augmentedItem.tier), quantity: 100 * augmentedItem.amount });
            break;
        case 'ClothPackage':
            baseItems.push({ resource: SheetResourceNames.Cloth, tier: getSheetTier(augmentedItem.tier), quantity: 100 * augmentedItem.amount });
            break;
        case 'LeatherPackage':
            baseItems.push({ resource: SheetResourceNames.Leather, tier: getSheetTier(augmentedItem.tier), quantity: 100 * augmentedItem.amount });
            break;
        case 'BrickPackage':
            baseItems.push({ resource: SheetResourceNames.Brick, tier: getSheetTier(augmentedItem.tier), quantity: 100 * augmentedItem.amount });
            break;
        case 'IngotPackage':
            baseItems.push({ resource: SheetResourceNames.Ingot, tier: getSheetTier(augmentedItem.tier), quantity: 100 * augmentedItem.amount });
            break;
        case 'RefinedPlankPackage':
            baseItems.push(...mapAugmentedItem({ ...augmentedItem, name: augmentedItem.name.replace(' Package', ''), amount: 100 * augmentedItem.amount }, 'RefinedPlanks'));
            break;
        case 'RefinedClothPackage':
            baseItems.push(...mapAugmentedItem({ ...augmentedItem, name: augmentedItem.name.replace(' Package', ''), amount: 100 * augmentedItem.amount }, 'RefinedCloth'));
            break;
        case 'RefinedLeatherPackage':
            baseItems.push(...mapAugmentedItem({ ...augmentedItem, name: augmentedItem.name.replace(' Package', ''), amount: 100 * augmentedItem.amount }, 'RefinedLeather'));
            break;
        case 'RefinedBrickPackage':
            baseItems.push(...mapAugmentedItem({ ...augmentedItem, name: augmentedItem.name.replace(' Package', ''), amount: 100 * augmentedItem.amount }, 'RefinedBrick'));
            break;
        case 'RefinedIngotPackage':
            baseItems.push(...mapAugmentedItem({ ...augmentedItem, name: augmentedItem.name.replace(' Package', ''), amount: 100 * augmentedItem.amount }, 'RefinedIngot'));
            break;
        default:
            break;
    }
    return baseItems;
}

const shouldIgnoreStorage = (inventory: StoredItem[]): boolean => {
    return inventory[0]?.name === 'Stick';
}
