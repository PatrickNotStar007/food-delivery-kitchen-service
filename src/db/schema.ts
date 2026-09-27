import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('statuses', ['pending', 'recieved']);

export const ticketsTable = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').primaryKey(),
  customerName: varchar('customerName', { length: 100 }).notNull(),
  item: varchar('item', { length: 100 }).notNull(),
  status: statusEnum('status').notNull().default('recieved'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const Ticket = typeof ticketsTable.$inferSelect;
export const NewTicket = typeof ticketsTable.$inferInsert;
