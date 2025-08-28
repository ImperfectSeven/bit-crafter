import { test, describe, expect } from "vitest";
import { SheetResourceNames, SheetTiers, type Inventory, type ResourceSubmissionEntry } from "./types";
import { mapRelevantItemData } from "./sheet-helper";

describe('mapRelevantItemData', () => {
    test('correctly maps Diagrams', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Basic Stone Diagrams',
                        tier: 1,
                        amount: 5,
                    }
                ]
            }
        };
        const expected: ResourceSubmissionEntry[] = [
            expect.objectContaining({
                resource: SheetResourceNames.Carving,
                tier: SheetTiers[1],
                quantity: 5
            })
        ]

        const actual = mapRelevantItemData(inv);
        expect(actual).toEqual(expected);
    });

    test ('correctly maps Refined Cloth', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Refined Flawless Cloth',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };
        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Cloth && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.AnimalHair && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.Straw && n.tier === SheetTiers[1])?.quantity).toBe(512);

        expect(actual.length).toEqual(30);
    });

    test('correctly maps Refined Leather', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Refined Flawless Leather',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };

        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Leather && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.Braxite && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.FishOil && n.tier === SheetTiers[1])?.quantity).toBe(1024);
        expect(actual.find((n) => n.resource === SheetResourceNames.Vial && n.tier === SheetTiers[1])?.quantity).toBe(512);
        
        // Check total number of buckets since its a non-tiered item
        expect(actual.filter((n) => n.resource === SheetResourceNames.WaterBucket).reduce((acc, n) => acc + n.quantity, 0)).toBe(1023);

        expect(actual.length).toEqual(50);
    });

    test('correctly maps Refined Brick', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Refined Flawless Brick',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };

        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Brick && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.Gypsite && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.Shell && n.tier === SheetTiers[1])?.quantity).toBe(512);

        expect(actual.length).toEqual(30);
    });

    test('correctly maps Refined Ingot', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Refined Astralite Ingot',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };

        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Ingot && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.CitricBerry && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.Pebble && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.Vial && n.tier === SheetTiers[1])?.quantity).toBe(512);
        
        // Check total number of buckets since its a non-tiered item
        expect(actual.filter((n) => n.resource === SheetResourceNames.WaterBucket).reduce((acc, n) => acc + n.quantity, 0)).toBe(1023);

        expect(actual.length).toEqual(50);
    });

    test('correctly maps Refined Planks', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Refined Flawless Plank',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };

        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Plank && n.tier === SheetTiers[1])?.quantity).toBe(2560);
        expect(actual.find((n) => n.resource === SheetResourceNames.Resin && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.CropOil && n.tier === SheetTiers[1])?.quantity).toBe(512);
        expect(actual.find((n) => n.resource === SheetResourceNames.Vial && n.tier === SheetTiers[1])?.quantity).toBe(512);

        // Check total number of buckets since its a non-tiered item
        expect(actual.filter((n) => n.resource === SheetResourceNames.Pitch).reduce((acc, n) => acc + n.quantity, 0)).toBe(1023);

        expect(actual.length).toEqual(50);
    });

    test('correctly maps Study Journals', () => {
        const inv: Inventory = {
            mockStorage: {
                storageName: 'Mock Storage',
                items: [
                    {
                        slotIndex: 0,
                        name: 'Flawless Study Journal',
                        tier: 10,
                        amount: 1,
                    }
                ]
            }
        };

        const actual = mapRelevantItemData(inv);

        // Check individual counts at tier 1
        expect(actual.find((n) => n.resource === SheetResourceNames.Parchment && n.tier === SheetTiers[1])?.quantity).toBe(1024);
        expect(actual.find((n) => n.resource === SheetResourceNames.Pigment && n.tier === SheetTiers[1])?.quantity).toBe(1024);
        expect(actual.find((n) => n.resource === SheetResourceNames.FishOil && n.tier === SheetTiers[1])?.quantity).toBe(2048);
        expect(actual.find((n) => n.resource === SheetResourceNames.Carving && n.tier === SheetTiers[1])?.quantity).toBe(512);
    });
});
