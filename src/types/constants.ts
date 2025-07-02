import type { Tier } from "../data/types";

export const TierNames = {
    [-1]: 'Common',
    0: 'Trade Good',
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    11: 'XI',
    12: 'XII',
    13: 'XIII',
    14: 'XIV',
} as const satisfies Record<Tier, string>;

export const TierColors: Record<Tier, string> = {
    [-1]: "#413A64",
    0: "#413A64",
    1: "#636A74",
    2: "#875F45",
    3: "#5C6F4D",
    4: "#49619C",
    5: "#f44336",
    6: "#ccc",
    7: "#ccc",
    8: "#ccc",
    9: "#ccc",
    10: "#ccc",
    11: "#ccc",
    12: "#ccc",
    13: "#ccc",
    14: "#ccc",
};