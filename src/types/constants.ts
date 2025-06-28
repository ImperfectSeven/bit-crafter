export const PROFESSIONS = {
    Carpentry: 'Carpentry',
    Construction: 'Construction',
    Masonry: 'Masonry',
    Farming: 'Farming',
    Fishing: 'Fishing',
    Hunting: 'Hunting',
    Mining: 'Mining',
    Foraging: 'Foraging',
    Forestry: 'Forestry',
    Leatherworking: 'Leatherworking',
    Smithing: 'Smithing',
    Scholar: 'Scholar',
    Tailoring: 'Tailoring',
    Cooking: 'Cooking',
} as const;
export type Profession = (typeof PROFESSIONS)[keyof typeof PROFESSIONS];

export const STRUCTURES = {
    None: 'None',
    Farm: 'Farm',
    Kiln: 'Kiln',
    Oven: 'Oven',
    Smelter: 'Smelter',
    TanningTub: 'Tanning Tub',
    Loom: 'Loom',

    FarmingStation: "Farming Station",
    TailoringStation: "Tailoring Station",
    SmithingStation: "Smithing Station",
    CarpentryStation: "Carpentry Station",
    ForestryStation: "Forestry Station",
    ScholarStation: "Scholar Station",
    ForagingStation: "Foraging Station",
    CookingStation: "Cooking Station",
    FishingStation: "Fishing Station",
    LeatherworkingStation: "Leatherworking Station",
    HuntingStation: "Hunting Station",
    MasonryStation: "Masonry Station",
    MiningStation: "Mining Station",
} as const;
export type Structure = (typeof STRUCTURES)[keyof typeof STRUCTURES];
