import { ProductImageUploadedFile, UploadedFile } from "@/types";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferModel, relations } from "drizzle-orm";
import {
  double,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", ["user", "seller", "admin"])
    .default("user")
    .notNull(),
});
export type User = InferModel<typeof users>;

export const usersRelations = relations(users, ({ many, one }) => ({
  stores: many(stores),
  cartItems: many(cartItems),
  likes: many(likes),
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  session: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const stores = mysqlTable("store", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  avatar: json("avatar").$type<UploadedFile | null>().default(null),
  cover: json("cover").$type<UploadedFile | null>().default(null),
  contactEmail: varchar("contactEmail", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  userId: varchar("userId", { length: 255 }).notNull(),
});
export type Store = InferModel<typeof stores>;

export const storesRelations = relations(stores, ({ many, one }) => ({
  user: one(users, {
    fields: [stores.userId],
    references: [users.id],
  }),
  products: many(products),
}));

export const products = mysqlTable("product", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: double("price", { precision: 10, scale: 2 }).notNull().default(0.0),
  category: varchar("category", { length: 255 }).notNull(),
  subcategory: varchar("subcategory", { length: 255 }),
  images: json("images").$type<ProductImageUploadedFile[]>().default([]),
  files: json("files").$type<UploadedFile[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
});
export type Product = InferModel<typeof products>;

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  cartItems: many(cartItems),
}));

export const cartItems = mysqlTable(
  "cartItem",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    productId: varchar("productId", { length: 255 }).notNull(),
  },
  (cartItems) => ({
    pk: primaryKey(cartItems.userId, cartItems.productId),
  })
);
export type CartItem = InferModel<typeof cartItems>;

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const likes = mysqlTable(
  "like",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    productId: varchar("productId", { length: 255 }).notNull(),
  },
  (likes) => ({
    pk: primaryKey(likes.userId, likes.productId),
  })
);
export type Like = InferModel<typeof likes>;

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [likes.productId],
    references: [products.id],
  }),
}));
