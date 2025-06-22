import { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';
import type { CraftingRecipe } from '../types/recipes';

/**
 * Fetches all recipes from the server and returns them, along with
 * loading and error states.
 *
 * @returns an object with three properties: `recipes`, which is an
 * array of all recipes; `loading`, a boolean indicating whether the
 * recipes are currently being fetched; and `error`, which may be an
 * error if there was a problem fetching the recipes.
 */
const useRecipes = () => {
  const [recipes, setRecipes] = useState<CraftingRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const recipes = await recipeService.getRecipes();
        setRecipes(recipes);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(JSON.stringify(error)));
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;