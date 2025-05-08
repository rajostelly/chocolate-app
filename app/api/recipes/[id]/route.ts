import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants";
import { prisma } from "@/lib/db";

// Schema for validating recipe updates
const recipeUpdateSchema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED_NAME).optional(),
  description: z.string().optional(),
  protocol: z.array(z.string()).optional(),
  molding: z.array(z.string()).optional(),
  yield: z.number().min(1, VALIDATION_MESSAGES.MIN_YIELD).optional(),
  totalCost: z.number().optional(),
  stock: z.number().min(0, VALIDATION_MESSAGES.MIN_STOCK).optional(),
  ingredients: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED_INGREDIENT_NAME),
        quantity: z.number().min(0, VALIDATION_MESSAGES.MIN_QUANTITY),
        price: z.number().min(0, VALIDATION_MESSAGES.MIN_PRICE),
      })
    )
    .optional(),
});

// GET /api/recipes/[id] - Get a specific recipe
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: params.id,
      },
      include: {
        ingredients: true,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

// PUT /api/recipes/[id] - Update a recipe
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = recipeUpdateSchema.parse(body);

    // Check if the recipe exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: params.id,
      },
      include: {
        ingredients: true,
      },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Extract ingredients to handle them separately
    const { ingredients, ...recipeData } = validatedData;

    // Update the recipe with its ingredients in a transaction
    const updatedRecipe = await prisma.$transaction(async (tx) => {
      // Update the recipe
      const recipe = await tx.recipe.update({
        where: {
          id: params.id,
        },
        data: recipeData,
      });

      // If ingredients are provided, update them
      if (ingredients) {
        // Delete existing ingredients
        await tx.ingredient.deleteMany({
          where: {
            recipeId: params.id,
          },
        });

        // Create new ingredients
        await tx.ingredient.createMany({
          data: ingredients.map((ingredient) => ({
            ...ingredient,
            recipeId: params.id,
          })),
        });
      }

      // Return the updated recipe with its ingredients
      return tx.recipe.findUnique({
        where: {
          id: params.id,
        },
        include: {
          ingredients: true,
        },
      });
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

// DELETE /api/recipes/[id] - Delete a recipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the recipe exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Delete the recipe (ingredients will be deleted automatically due to cascade)
    await prisma.recipe.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
