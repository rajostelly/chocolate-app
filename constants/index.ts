// Tablet weight constants
export const MINI_TABLET_WEIGHT = 5; // en grammes
export const NORMAL_TABLET_WEIGHT = 100; // en grammes
export const CONVERSION_RATIO = NORMAL_TABLET_WEIGHT / MINI_TABLET_WEIGHT; // 20 mini tablettes = 1 tablette normale

// API endpoints
export const API_ENDPOINTS = {
  RECIPES: "/api/recipes",
  RECIPE: (id: string) => `/api/recipes/${id}`,
  RECIPE_STOCK: (id: string) => `/api/recipes/${id}/stock`,
};

// Toast messages
export const TOAST_MESSAGES = {
  // Success messages
  SUCCESS: {
    CREATE_RECIPE: "Recette créée avec succès!",
    UPDATE_RECIPE: "Recette mise à jour avec succès!",
    DELETE_RECIPE: "Recette supprimée avec succès!",
    UPDATE_STOCK: "Stock mis à jour avec succès!",
  },
  // Error messages
  ERROR: {
    FETCH_RECIPES: "Erreur lors du chargement des recettes",
    FETCH_RECIPE: "Erreur lors du chargement de la recette",
    CREATE_RECIPE: "Erreur lors de la création de la recette",
    UPDATE_RECIPE: "Erreur lors de la mise à jour de la recette",
    DELETE_RECIPE: "Erreur lors de la suppression de la recette",
    UPDATE_STOCK: "Erreur lors de la mise à jour du stock",
  },
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_NAME: "Le nom est requis",
  REQUIRED_YIELD: "Le rendement est requis",
  MIN_YIELD: "Le rendement doit être au moins 1",
  MIN_STOCK: "Le stock ne peut pas être négatif",
  REQUIRED_INGREDIENT_NAME: "Le nom de l'ingrédient est requis",
  MIN_QUANTITY: "La quantité doit être positive",
  MIN_PRICE: "Le prix doit être positif",
};

// Query keys for React Query
export const QUERY_KEYS = {
  RECIPES: ["recipes"],
  RECIPE: (id: string) => ["recipes", id],
  RECIPE_STOCK: (id: string) => ["recipes", id, "stock"],
};

// Default pagination values
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
};

// Local storage keys (for reference, not used anymore)
export const STORAGE_KEYS = {
  RECIPES: "recipes",
};
