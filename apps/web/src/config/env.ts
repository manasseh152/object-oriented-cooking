import * as v from "valibot";

export const envSchema = v.object({
  dev: v.boolean(),
  prod: v.boolean(),
});
export type Env = v.InferOutput<typeof envSchema>;

export const env = v.parse(envSchema, {
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
});
