/* eslint-disable no-console */
import { client } from './trpc';

const measurementUnits = await client.measurementUnit.getAll.query();

console.table(measurementUnits.map(measurementUnit => ({
  measurementUnitId: measurementUnit.measurementUnitId,
  baseUnitId: measurementUnit.baseUnit?.measurementUnitId,
  abbreviation: measurementUnit.abbreviation,
  system: measurementUnit.system,
  type: measurementUnit.type,
})));

const tags = await client.tag.getAll.query();

console.table(tags.map(tag => ({
  tagId: tag.tagId,
  name: tag.name,
  parent: tag.parent?.tagId ? 1 : 0,
  children: tag.children.length,
})));

const recipes = await client.recipe.getAll.query();

console.table(recipes.map(recipe => ({
  recipeId: recipe.recipeId,
  title: recipe.title,
  ingredients: recipe.ingredients.length,
  steps: recipe.steps.length,
})));

const ingredients = await client.ingredient.getAll.query();

console.table(ingredients.map(ingredient => ({
  ingredientId: ingredient.ingredientId,
  name: ingredient.name,
})));

const steps = await client.step.getAll.query();

console.table(steps.map(step => ({
  stepId: step.stepId,
  order: step.order,
  instruction: step.instruction,
})));
