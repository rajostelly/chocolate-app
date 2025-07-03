export interface Ingredient {
  id?: string;
  name: string;
  quantity: number;
  price: number;
}

// this is a TypeScript interface for a recipe object
export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[];
  protocol: string[];
  molding: string[];
  yield: number;
  totalCost: number;
  stock: number;
}
