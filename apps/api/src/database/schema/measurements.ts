import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-valibot';
import * as v from 'valibot';

import { commonTimestamps } from '../config';

const MEASUREMENT_UNIT_TYPES = ['count', 'weight', 'volume'] as const;
export const measurementUnitType = t.pgEnum('measurement_unit_type', MEASUREMENT_UNIT_TYPES);
export const measurementUnitTypePicklist = v.picklist(MEASUREMENT_UNIT_TYPES, 'Measurement Unit Type');
export type MeasurementUnitType = (typeof MEASUREMENT_UNIT_TYPES)[number];

const MEASUREMENT_UNIT_SYSTEMS = ['metric', 'imperial'] as const;
export const measurementUnitSystem = t.pgEnum('measurement_unit_system', MEASUREMENT_UNIT_SYSTEMS);
export const measurementUnitSystemPicklist = v.picklist(MEASUREMENT_UNIT_SYSTEMS, 'Measurement Unit System');
export type MeasurementUnitSystem = (typeof MEASUREMENT_UNIT_SYSTEMS)[number];

// Measurement units for ingredients
export const measurementUnitTable = t.pgTable(
  'measurement_units',
  {
    id: t.serial('id').primaryKey(),
    measurementUnitId: t
      .uuid('measurement_unit_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    abbreviation: t.varchar('abbreviation', { length: 50 }).notNull().unique(),
    description: t.text('description'),
    type: measurementUnitType('type').notNull(),
    system: measurementUnitSystem('system').notNull(),
    conversionFactor: t.doublePrecision('conversion_factor').notNull(),
    baseUnitId: t
      .integer('base_unit_id')
      .references((): t.AnyPgColumn => measurementUnitTable.id),
    isBaseUnit: t.boolean('is_base_unit').default(false),
    isActive: t.boolean('is_active').default(true),
    ...commonTimestamps(),
  },
  table => [
    t.index('idx_measurement_units_measurement_unit_id').on(table.measurementUnitId),
    t.index('idx_measurement_units_name').on(table.name),
    t.index('idx_measurement_units_abbreviation').on(table.abbreviation),
    t.index('idx_measurement_units_type').on(table.type),
    t.index('idx_measurement_units_system').on(table.system),
    t.index('idx_measurement_units_conversion_factor').on(table.conversionFactor),
    t.index('idx_measurement_units_base_unit_id').on(table.baseUnitId),
    t.index('idx_measurement_units_is_base_unit').on(table.isBaseUnit),
    t.index('idx_measurement_units_is_active').on(table.isActive),
  ],
);

// Set up relations
export const measurementUnitRelations = relations(measurementUnitTable, ({ one }) => ({
  baseUnit: one(measurementUnitTable, {
    fields: [measurementUnitTable.baseUnitId],
    references: [measurementUnitTable.id],
    relationName: 'measurementUnit:baseUnit',
  }),
}));

// Schemas
export const measurementUnitSelectSchema = createSelectSchema(measurementUnitTable);
export const measurementUnitInsertSchema = createInsertSchema(measurementUnitTable);
export const measurementUnitUpdateSchema = createUpdateSchema(measurementUnitTable);
export type MeasurementUnit = typeof measurementUnitTable.$inferSelect;
export type MeasurementUnitInsert = typeof measurementUnitTable.$inferInsert;
