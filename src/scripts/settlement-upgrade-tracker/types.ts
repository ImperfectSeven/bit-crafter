
/** Resources supported by the Sheet */
export const SheetResourceNames = {
    Plank: 'Planks',
    Ingot: 'Ingots',
    Cloth: 'Cloth',
    Brick: 'Bricks',
    Leather: 'Leather',
    CitricBerry: 'Citric Berry',
    Pebble: 'Pebbles',
    Vial: 'Vials',
    WaterBucket: 'Water Buckets',
    Resin: 'Resin',
    CropOil: 'Crop Oil',
    Pitch: 'Pitch',
    AnimalHair: 'Fur',
    Straw: 'Straw',
    Braxite: 'Braxite',
    FishOil: 'Fish Oil',
    Gypsite: 'Gypsite',
    Shell: 'Crushed Shells',
    Parchment: 'Parchment',
    Carving: 'Carvings',
    Pigment: 'Pigment',
    Unknown: 'Unknown',
} as const;
/** Resources supported by the Sheet */
export type SheetResourceName = typeof SheetResourceNames[keyof typeof SheetResourceNames];

/** Tiers supported by the Sheet */
export const SheetTiers = ['Unknown', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'] as const;
/** Tiers supported by the Sheet */
export type SheetTier = typeof SheetTiers[number];

/** Shape of the data needed for submitting a resource to the sheet */
export type ResourceSubmissionEntry = {
    /** Time of submission */
    time: Date;
    /** Owner of the submission */
    name: string;
    /** Resource name */
    resource: SheetResourceName;
    /** Resource tier */
    tier: SheetTier;
    /** Amount submitted */
    quantity: number;
    /** Optional note */
    note?: string;
};

export type Config = {
    GOOGLE_CREDENTIALS: string;
    SPREADSHEET_ID: string;
    CLAIM_ID: string;
    SETTINGS?: ScraperSettings;
};

/** Shape of item data that is stored within a Claim */
export type StoredItem = {
    name: string;
    amount: number;
    tier: number;
    slotIndex: number;
};

/** Represents a storage inventory on a claim and the items within it */
export type Inventory = Record<string, { storageName: string; items: StoredItem[] }>;

export type ScraperSettings = {
    /** Name of item that triggers either inclusion or exclusion */
    triggerItem?: string;
    /** Slot index of the item that triggers either inclusion or exclusion */
    triggerSlot?: number;
    /** Quantity of the trigger item to check for. */
    triggerItemQty?: number;
    /** If true, exclude items that contain the trigger item */
    excludeTrigger?: boolean;
    /** If true, include items that contain the trigger item */
    includeTrigger?: boolean;
    /** If true, only include stalls in the results */
    onlyIncludeStalls?: boolean;
}