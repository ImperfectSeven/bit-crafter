export const PROFESSIONS = {
    Carpentry: 'Carpentry',
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
} as const;
export type Profession = (typeof PROFESSIONS)[keyof typeof PROFESSIONS];

export const STRUCTURES = {
    Farm: 'Farm',
    Kiln: 'Kiln',
    Oven: 'Oven',
    Smelter: 'Smelter',
    TanningTub: 'Tanning Tub',
} as const;
export type Structure = (typeof STRUCTURES)[keyof typeof STRUCTURES];