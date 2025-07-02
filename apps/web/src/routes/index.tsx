import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

export function IndexPage() {
  const trpc = useTRPC();

  const recipeQuery = useQuery(trpc.recipe.getAll.queryOptions());

  return (
    <>
      <h1 className="text-2xl font-bold">Recipes</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipeQuery.isLoading
          ? (
              <div className="col-span-full">Loading...</div>
            )
          : (
              recipeQuery.data?.map(recipe => (
                <Link to="/recipes/$recipeId" params={{ recipeId: recipe.recipeId }} key={recipe.recipeId}>
                  <Card>
                    <Card.Header>
                      <Card.Title>{recipe.title}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <p>{recipe.description}</p>
                    </Card.Content>
                    <Card.Footer>
                      <ol className="flex gap-2 text-sm text-muted-foreground">
                        <li>
                          <span>
                            {recipe.cookTime}
                            {" "}
                            min
                          </span>
                        </li>
                        <li>
                          <span>
                            {recipe.prepTime}
                            {" "}
                            min
                          </span>
                        </li>
                        <li>
                          <span>
                            {recipe.servings}
                            {" "}
                            servings
                          </span>
                        </li>
                      </ol>
                    </Card.Footer>
                  </Card>
                </Link>
              ))
            )}
      </div>
    </>
  );
}
