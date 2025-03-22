import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const blobsTable = pgTable(
  "blobs",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    signature: varchar({ length: 344 }).notNull(),
    blob: text().notNull(),
  },
  (t) => [uniqueIndex("blobs-signature-index").on(t.signature)],
);
