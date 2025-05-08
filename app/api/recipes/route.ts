import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants";
import { prisma } from "@/lib/db";

// Schema for validating recipe creation
const recipeSchema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED_NAME),
  description: z.string().optional(),
  protocol: z.array(z.string()),
  molding: z.array(z.string()),
  yield: z.number().min(1, VALIDATION_MESSAGES.MIN_YIELD),
  totalCost: z.number(),
  stock: z.number().min(0, VALIDATION_MESSAGES.MIN_STOCK),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED_INGREDIENT_NAME),
      quantity: z.number().min(0, VALIDATION_MESSAGES.MIN_QUANTITY),
      price: z.number().min(0, VALIDATION_MESSAGES.MIN_PRICE),
    })
  ),
});

// GET /api/recipes - Get all recipes
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

// POST /api/recipes - Create a new recipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = recipeSchema.parse(body);

    // Extract ingredients to create them separately
    const { ingredients, ...recipeData } = validatedData;

    // Create the recipe with its ingredients in a transaction
    const recipe = await prisma.$transaction(async (tx) => {
      // Create the recipe
      const newRecipe = await tx.recipe.create({
        data: {
          ...recipeData,
          ingredients: {
            create: ingredients,
          },
        },
        include: {
          ingredients: true,
        },
      });

      return newRecipe;
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
