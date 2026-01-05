import { pgTable, serial, text, timestamp, integer, decimal } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    status: text("status").notNull().default("active"),
    budget: decimal("budget", { precision: 12, scale: 2 }),
    lead: text("lead"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const metrics = pgTable("metrics", {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => projects.id),
    type: text("type").notNull(), // e.g., 'revenue', 'health'
    value: decimal("value", { precision: 12, scale: 2 }).notNull(),
    recordedAt: timestamp("recorded_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
    id: serial("id").primaryKey(),
    action: text("action").notNull(),
    userId: text("user_id"),
    entityId: text("entity_id"),
    createdAt: timestamp("created_at").defaultNow(),
});
