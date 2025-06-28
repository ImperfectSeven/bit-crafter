export const TIERS = [0, 1, 2] as const;

export const ROUGH_TIERS = ['Rough', 'Simple', 'Sturdy'] as const;
export const BASIC_TIERS = ['Basic', 'Simple', 'Infused'] as const;
export const PLAIN_TIERS = ['Plain', 'Savory'] as const;
export const BEGINNER_TIERS = ['Beginner', 'Novice', 'Journeyman'] as const;
export const FISH_TIERS = ['Breezy Fin Darter', 'Emberfin Shiner'] as const;
export const BAIT_FISH_TIERS = ['Moonlit Crawdad', 'Driftwood Crayfish'] as const;
export const ORE_TIERS = ['Ferralith', 'Pyrelite', 'Emarium'] as const;
export const HUNTING_TIERS = ['Sagi Bird', 'Nubi Goat'] as const;

export const effortCalc = (baseEffort: number, tier: number) => baseEffort * (1 + tier);
export const timeCalc = (tier: number) => ([5, 15][tier] ?? 0) * 60;