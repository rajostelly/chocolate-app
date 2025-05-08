import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants";
import { prisma } from "@/lib/db";

// Schema for validating stock updates
const stockUpdateSchema = z.object({
  stock: z.number().min(0, VALIDATION_MESSAGES.MIN_STOCK),
});

// PATCH /api/recipes/[id]/stock - Update recipe stock
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate the request body
    const { stock } = stockUpdateSchema.parse(body);

    // Check if the recipe exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Update the recipe stock
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: params.id,
      },
      data: {
        stock,
      },
      include: {
        ingredients: true,
      },
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe stock:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update recipe stock" },
      { status: 500 }
    );
  }
}
