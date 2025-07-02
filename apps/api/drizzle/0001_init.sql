CREATE TYPE "public"."auth_method_type" AS ENUM('EMAIL_PASSWORD');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."measurement_unit_system" AS ENUM('metric', 'imperial');--> statement-breakpoint
CREATE TYPE "public"."measurement_unit_type" AS ENUM('count', 'weight', 'volume');--> statement-breakpoint
CREATE TYPE "public"."recipe_difficulty" AS ENUM('easy', 'medium', 'hard', 'expert');--> statement-breakpoint
CREATE TABLE "auth_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"type" "auth_method_type" NOT NULL,
	"password_hash" varchar(255),
	"is_enabled" boolean DEFAULT true NOT NULL,
	"last_used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "password_resets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "password_resets_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_agent" varchar(255),
	"ip_address" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "measurement_units" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"abbreviation" varchar(50) NOT NULL,
	"description" text,
	"type" "measurement_unit_type" NOT NULL,
	"system" "measurement_unit_system" NOT NULL,
	"conversion_factor" double precision NOT NULL,
	"base_unit_id" integer,
	"is_base_unit" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "measurement_units_name_unique" UNIQUE("name"),
	CONSTRAINT "measurement_units_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"ingredient_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "ingredients_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "recipe_ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"unit_id" integer,
	"quantity" double precision NOT NULL,
	"is_optional" boolean DEFAULT false,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"parent_recipe_id" integer,
	"tag_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"instructions" text NOT NULL,
	"prep_time" integer NOT NULL,
	"cook_time" integer NOT NULL,
	"servings" integer NOT NULL,
	"difficulty" "recipe_difficulty" DEFAULT 'medium',
	"notes" text,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"step_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"recipe_id" integer NOT NULL,
	"order" integer NOT NULL,
	"instruction" text NOT NULL,
	"image_url" varchar(512),
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "recipe_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"parent_id" integer,
	"name" varchar(255) NOT NULL,
	"color" varchar(7) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "auth_methods" ADD CONSTRAINT "auth_methods_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "measurement_units" ADD CONSTRAINT "measurement_units_base_unit_id_measurement_units_id_fk" FOREIGN KEY ("base_unit_id") REFERENCES "public"."measurement_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_unit_id_measurement_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."measurement_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_parent_recipe_id_recipes_id_fk" FOREIGN KEY ("parent_recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_tags" ADD CONSTRAINT "recipe_tags_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_tags" ADD CONSTRAINT "recipe_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_parent_id_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_auth_methods_user_id" ON "auth_methods" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_auth_methods_type" ON "auth_methods" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_password_resets_user_id" ON "password_resets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_password_resets_token" ON "password_resets" USING btree ("token");--> statement-breakpoint
CREATE INDEX "idx_password_resets_expires_at" ON "password_resets" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_sessions_session_id" ON "sessions" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_sessions_user_id" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_sessions_expires_at" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_users_user_id" ON "users" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_unit_id" ON "measurement_units" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_name" ON "measurement_units" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_abbreviation" ON "measurement_units" USING btree ("abbreviation");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_type" ON "measurement_units" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_system" ON "measurement_units" USING btree ("system");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_conversion_factor" ON "measurement_units" USING btree ("conversion_factor");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_base_unit_id" ON "measurement_units" USING btree ("base_unit_id");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_is_base_unit" ON "measurement_units" USING btree ("is_base_unit");--> statement-breakpoint
CREATE INDEX "idx_measurement_units_is_active" ON "measurement_units" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_ingredients_ingredient_id" ON "ingredients" USING btree ("ingredient_id");--> statement-breakpoint
CREATE INDEX "idx_ingredients_name" ON "ingredients" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_recipe_ingredients_recipe_id" ON "recipe_ingredients" USING btree ("recipe_id");--> statement-breakpoint
CREATE INDEX "idx_recipe_ingredients_ingredient_id" ON "recipe_ingredients" USING btree ("ingredient_id");--> statement-breakpoint
CREATE INDEX "idx_recipes_recipe_id" ON "recipes" USING btree ("recipe_id");--> statement-breakpoint
CREATE INDEX "idx_recipes_tag_id" ON "recipes" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_recipes_title" ON "recipes" USING btree ("title");--> statement-breakpoint
CREATE INDEX "idx_recipes_difficulty" ON "recipes" USING btree ("difficulty");--> statement-breakpoint
CREATE INDEX "idx_recipes_is_published" ON "recipes" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "idx_steps_step_id" ON "steps" USING btree ("step_id");--> statement-breakpoint
CREATE INDEX "idx_steps_recipe_id" ON "steps" USING btree ("recipe_id");--> statement-breakpoint
CREATE INDEX "idx_steps_order" ON "steps" USING btree ("order");--> statement-breakpoint
CREATE INDEX "idx_recipe_tags_recipe_id" ON "recipe_tags" USING btree ("recipe_id");--> statement-breakpoint
CREATE INDEX "idx_recipe_tags_tag_id" ON "recipe_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_tags_tag_id" ON "tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_tags_name" ON "tags" USING btree ("name");