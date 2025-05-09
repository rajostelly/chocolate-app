"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import type { RecipeFormData, RecipeWithIngredients } from "@/types";
import { useCreateRecipe, useUpdateRecipe } from "@/hooks/use-recipes";

interface RecipeFormProps {
  recipe?: RecipeWithIngredients;
  isEditing?: boolean;
}

// Define a more explicit form type
type RecipeForm = {
  name: string;
  description?: string | null;
  // protocol: string[];
  protocol: { step: string }[];
  molding: string[];
  yield: number;
  totalCost: number;
  stock: number;
  ingredients: {
    id?: string;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export default function RecipeForm({
  recipe,
  isEditing = false,
}: RecipeFormProps) {
  const router = useRouter();
  const createRecipeMutation = useCreateRecipe();
  const updateRecipeMutation = useUpdateRecipe();
  const [calculatingPrice, setCalculatingPrice] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RecipeForm>({
    defaultValues: recipe
      ? {
          ...recipe,
          protocol: recipe.protocol.map((step) => ({ step })), // <- CHANGÉ
        }
      : {
          name: "",
          description: "",
          ingredients: [{ name: "", quantity: 0, price: 0 }],
          protocol: [{ step: "" }], // <- CHANGÉ
          molding: [],
          yield: 0,
          totalCost: 0,
          stock: 0,
        },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: protocolFields,
    append: appendProtocol,
    remove: removeProtocol,
  } = useFieldArray({
    control,
    name: "protocol",
  });

  // Observer les ingrédients pour calculer le coût total
  const ingredients = watch("ingredients") || [];
  const [totalCost, setTotalCost] = useState(recipe?.totalCost || 0);

  // Calculate total cost when ingredients change
  useState(() => {
    const calculatedCost = ingredients.reduce((sum, ingredient) => {
      return sum + (ingredient.quantity * ingredient.price) / 1000;
    }, 0);

    setTotalCost(calculatedCost);
    setValue("totalCost", calculatedCost);
  });

  const onSubmit = async (data: RecipeForm) => {
    try {
      if (isEditing && recipe) {
        await updateRecipeMutation.mutateAsync({
          id: recipe.id,
          recipe: {
            ...data,
            protocol: data.protocol.map((stepObj) => stepObj.step),
          } as RecipeFormData,
        });
      } else {
        await createRecipeMutation.mutateAsync({
          ...data,
          protocol: data.protocol.map((stepObj) => stepObj.step),
        } as RecipeFormData);
      }
      router.push("/recettes");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="rounded-[2.5rem] p-3">
        <CardHeader>
          <CardTitle className="text-chocolate-700 tracking-wide">
            Informations générales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom de la recette :</Label>
            <Input
              id="name"
              {...register("name", { required: "Le nom est requis" })}
              placeholder="Ex: Chocolat aux baies de goji"
              className={errors.name ? "border-red-300" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (optionnelle) :</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Description de la recette..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="yield">Nombre de mini tablettes :</Label>
              <Input
                id="yield"
                type="number"
                {...register("yield", {
                  required: "Le nombre de tablettes est requis",
                  min: { value: 1, message: "Doit être au moins 1" },
                  valueAsNumber: true,
                })}
                placeholder="Ex: 15"
                className={errors.yield ? "border-red-300" : ""}
              />
              {errors.yield && (
                <p className="text-sm text-red-500">{errors.yield.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Stock initial :</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", {
                  min: 0,
                  valueAsNumber: true,
                })}
                placeholder="Ex: 0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] p-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-chocolate-700 tracking-wide">
            Ingrédients
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendIngredient({ name: "", quantity: 0, price: 0 })
            }
            className="border-green-200 text-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un ingrédient
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-5">
                <Label htmlFor={`ingredients.${index}.name`}>Nom :</Label>
                <Input
                  id={`ingredients.${index}.name`}
                  {...register(`ingredients.${index}.name` as const, {
                    required: "Requis",
                  })}
                  placeholder="Ex: Pâte de chocolat noir"
                  className={
                    errors.ingredients?.[index]?.name ? "border-red-300" : ""
                  }
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`ingredients.${index}.quantity`}>
                  Quantité (g) :
                </Label>
                <Input
                  id={`ingredients.${index}.quantity`}
                  type="number"
                  step="0.01"
                  {...register(`ingredients.${index}.quantity` as const, {
                    required: "Requis",
                    min: { value: 0, message: "Min 0" },
                    valueAsNumber: true,
                  })}
                  placeholder="Ex: 100"
                  className={
                    errors.ingredients?.[index]?.quantity
                      ? "border-red-300"
                      : ""
                  }
                />
              </div>

              <div className="col-span-3">
                <Label htmlFor={`ingredients.${index}.price`}>
                  Prix (Ar/kg) :
                </Label>
                <Input
                  id={`ingredients.${index}.price`}
                  type="number"
                  step="0.01"
                  {...register(`ingredients.${index}.price` as const, {
                    required: "Requis",
                    min: { value: 0, message: "Min 0" },
                    valueAsNumber: true,
                  })}
                  placeholder="Ex: 25"
                  className={
                    errors.ingredients?.[index]?.price ? "border-red-300" : ""
                  }
                />
              </div>

              <div className="col-span-2 flex justify-end">
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeIngredient(index)}
                    className="border-red-200 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-4 border-t border-gray-100">
            <span className="font-medium">Coût total des ingrédients:</span>
            <span className="font-medium text-chocolate-700">
              {Math.round(totalCost).toLocaleString()} Ar
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] p-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-chocolate-700 tracking-wide">
            Protocole de fabrication
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendProtocol({ step: "" })} // <- CHANGÉ
            className="border-green-200 text-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une étape
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {protocolFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex-grow">
                <Label htmlFor={`protocol.${index}`} className="sr-only">
                  Étape {index + 1}
                </Label>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-chocolate-700 w-6">
                    {index + 1}.
                  </span>
                  <Input
                    id={`protocol.${index}`}
                    {...register(`protocol.${index}` as const, {
                      required: "Requis",
                    })}
                    placeholder={`Étape ${index + 1} du protocole...`}
                    className={errors.protocol?.[index] ? "border-red-300" : ""}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeProtocol(index)}
                className="border-red-200 hover:bg-red-50 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href="/recettes">
          <Button variant="outline" className="border-gray-200">
            Annuler
          </Button>
        </Link>
        <Button
          type="submit"
          className="bg-chocolate-700 hover:bg-chocolate-800"
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          {isEditing
            ? "Enregistrer les modifications"
            : "Enregistrer la recette"}
        </Button>
      </div>
    </form>
  );
}
