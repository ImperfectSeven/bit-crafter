/** Shape of data in the crafting_recipe_desc.json file */
export type CraftingRecipeDesc = {
    id: number;
    name: string;
    crafted_item_stacks: CraftedItemStack[];
    consumed_item_stacks: CraftedItemStack[];
    level_requirements: [number, number][];
    actions_required: number;
    time_requirement: number;
    is_passive: boolean;
    required_knowledges: number[];
}
export type CraftedItemStack = [
    number, // item_id
    number, // quantity
    [
        number,
        any[], // ???
    ],
    [
        0 | 1, // item_type (0 for normal, 1 for cargo)
        number
    ]
];

export type ItemDesc = {
    id: number;
    name: string;
    description: string;
    volume: number;
    durability: number;
    convert_to_on_durability_zero: number;
    secondary_knowledge_id: number;
    model_asset_name: string;
    icon_asset_name: string;
    tier: number;
    tag: string;
    rarity: [number, any];
    compendium_entry: true;
    item_list_id: number;
}