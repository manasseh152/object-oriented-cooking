import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

export function RecipePage() {
  const trpc = useTRPC();

  const { recipeId } = Route.useParams();

  const measurementUnitQuery = useQuery(trpc.measurementUnit.getAll.queryOptions());
  const tagsQuery = useQuery(trpc.tag.getAll.queryOptions());
  const ingredientsQuery = useQuery(trpc.ingredient.getAll.queryOptions());
  const recipesQuery = useQuery(trpc.recipe.getAll.queryOptions());
  const stepsQuery = useQuery(trpc.step.getAll.queryOptions());

  const recipe = recipesQuery.data?.find(recipe => recipe.recipeId === recipeId);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{recipe?.title}</h1>
      <p className="text-sm text-muted-foreground">{recipe?.description}</p>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe?.ingredients.map((row) => {
            const ingredient = ingredientsQuery.data?.find(ingredient => ingredient.ingredientId === row.ingredient.ingredientId);
            const measurementUnit = measurementUnitQuery.data?.find(measurementUnit => measurementUnit.measurementUnitId === row.unit.measurementUnitId);
            if (!ingredient || !measurementUnit)
              return null;

            return (
              <li key={row.ingredientId} className="flex items-center justify-between gap-2">
                <span>{ingredient.name}</span>
                <span>
                  {row.quantity}
                  {" "}
                  {measurementUnit.abbreviation}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Steps</h2>
        <ol className="list-decimal list-inside">
          {recipe?.steps.map((row) => {
            const step = stepsQuery.data?.find(step => step.stepId === row.stepId);

            if (!step)
              return null;

            return (
              <li key={row.stepId}>
                <span>{step.instruction}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
