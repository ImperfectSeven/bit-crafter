import { PROFESSIONS, STRUCTURES, type Profession, type Structure } from '../../types/constants';

// Define colors for each profession
export const PROFESSION_COLORS: Record<Profession, string> = {
    [PROFESSIONS.Carpentry]: '#8B4513', // Brown
    [PROFESSIONS.Masonry]: '#808080', // Gray
    [PROFESSIONS.Farming]: '#228B22', // Forest Green
    [PROFESSIONS.Fishing]: '#4682B4', // Steel Blue
    [PROFESSIONS.Hunting]: '#8B0000', // Dark Red
    [PROFESSIONS.Mining]: '#696969', // Dim Gray
    [PROFESSIONS.Foraging]: '#556B2F', // Dark Olive Green
    [PROFESSIONS.Forestry]: '#006400', // Dark Green
    [PROFESSIONS.Leatherworking]: '#CD853F', // Peru
    [PROFESSIONS.Smithing]: '#B8860B', // Dark Goldenrod
    [PROFESSIONS.Scholar]: '#4B0082', // Indigo
    [PROFESSIONS.Tailoring]: '#483D8B', // Dark Slate Blue
    [PROFESSIONS.Cooking]: '#D2691E', // Chocolate
};

// Define colors for each structure
export const STRUCTURE_COLORS: Record<Structure, string> = {
    [STRUCTURES.Farm]: PROFESSION_COLORS.Farming,
    [STRUCTURES.Kiln]: PROFESSION_COLORS.Masonry,
    [STRUCTURES.Oven]: PROFESSION_COLORS.Cooking,
    [STRUCTURES.Smelter]: PROFESSION_COLORS.Smithing,
    [STRUCTURES.TanningTub]: PROFESSION_COLORS.Leatherworking,
    [STRUCTURES.Loom]: PROFESSION_COLORS.Tailoring,
};