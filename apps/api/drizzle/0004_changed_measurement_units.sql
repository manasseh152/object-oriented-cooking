ALTER TABLE "measurement_units" RENAME COLUMN "unit_id" TO "measurement_unit_id";--> statement-breakpoint
DROP INDEX "idx_measurement_units_unit_id";--> statement-breakpoint
CREATE INDEX "idx_measurement_units_measurement_unit_id" ON "measurement_units" USING btree ("measurement_unit_id");