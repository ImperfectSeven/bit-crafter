import { useState, useEffect } from 'react';
import itemService from '../services/itemService';
import type { ItemRecipe } from '../types';

/**
 * Fetches all recipes from the server and returns them, along with
 * loading and error states.
 *
 * @returns an object with three properties: `recipes`, which is an
 * array of all recipes; `loading`, a boolean indicating whether the
 * recipes are currently being fetched; and `error`, which may be an
 * error if there was a problem fetching the recipes.
 */
const useItems = () => {
  const [items, setItems] = useState<Record<string, ItemRecipe[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const items = await itemService.getItems();
        setItems(items);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(JSON.stringify(error)));
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return { items, loading, error };
};

export default useItems;