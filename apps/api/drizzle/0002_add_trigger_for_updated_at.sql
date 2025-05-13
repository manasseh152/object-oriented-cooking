-- Custom SQL migration file, put your code below! --

-- Create the function to update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint

-- Add trigger to the "categories" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."categories"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "ingredients" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."ingredients"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "meal_plans" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."meal_plans"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "meal_slots" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."meal_slots"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "measurement_units" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."measurement_units"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "password_resets" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."password_resets"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "recipe_ingredients" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."recipe_ingredients"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "recipes" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."recipes"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "sessions" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "steps" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."steps"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "tags" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."tags"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

--> statement-breakpoint

-- Add trigger to the "users" table
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
