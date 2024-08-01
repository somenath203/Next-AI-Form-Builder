import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";


export const jsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(), 
    jsonform: text('jsonform').notNull(), 
    theme: varchar('theme'),
    background: varchar('background'),
    createdBy: varchar('createdBy').notNull(),
    createdDate: varchar('createdAt').notNull()
});


export const userResponseViaForm = pgTable('userResponseFromForm', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    createdBy: varchar('createdBy').default('anonymous'),
    createdDate: varchar('createdAt').notNull(),
    referenceOfTheFormWhichUserUsedToSubmitResponse: integer('formRef').references(() => jsonForms.id, {
        onDelete: 'cascade'
    })
});

