import { type CraftingRecipe, type ActiveRecipe, type PassiveRecipe } from '../../types/recipes';
import { type Profession, type Structure, type Tier } from '../../types/constants';

type ActiveRecipeBuilder = Omit<ActiveRecipe, 'recipeType' | 'profession' | 'tier'>;
type PassiveRecipeBuilder = Omit<PassiveRecipe, 'recipeType' | 'structure' | 'tier'>;

class RecipeCollectionBuilder {
    private recipes: CraftingRecipe[] = [];
    private readonly recipeType: 'active' | 'passive';
    private readonly professionOrStructure: Profession | Structure;

    constructor(recipeType: 'active' | 'passive', professionOrStructure: Profession | Structure) {
        this.recipeType = recipeType;
        this.professionOrStructure = professionOrStructure;
    }

    add(tier: Tier, recipes: (ActiveRecipeBuilder | PassiveRecipeBuilder)[]) {
        const newRecipes = recipes.map(recipe => ({
            ...recipe,
            tier,
            recipeType: this.recipeType,
            ...(this.recipeType === 'active' 
                ? { profession: this.professionOrStructure as Profession }
                : { structure: this.professionOrStructure as Structure }
            )
        })) as CraftingRecipe[];

        this.recipes.push(...newRecipes);
        return this;
    }

    getRecipes(): CraftingRecipe[] {
        return this.recipes;
    }
}

export const addProfessionRecipes = (profession: Profession) => 
    new RecipeCollectionBuilder('active', profession);

export const addStructureRecipes = (structure: Structure) => 
    new RecipeCollectionBuilder('passive', structure);
