export interface Ingredient {
  id?: string
  name: string
  quantity: number
  price: number
}

export interface Recipe {
  id: string
  name: string
  description?: string
  ingredients: Ingredient[]
  protocol: string[]
  molding: string[]
  yield: number
  totalCost: number
  stock: number
}
