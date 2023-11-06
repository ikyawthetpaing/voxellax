import {
  PasswordCredentials,
  ProductImageUploadedFile,
  UploadedFile,
} from "@/types";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
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
  password: json("password").$type<PasswordCredentials | null>(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", ["user", "seller", "admin"])
    .default("user")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type User = InferSelectModel<typeof users>;
export const usersRelations = relations(users, ({ many, one }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  session: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
  stores: many(stores),
  cartItems: many(cartItems),
  likes: many(likes),
  collections: many(collections),
  purchases: many(purchases),
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
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
});
export type Store = InferSelectModel<typeof stores>;
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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
});
export type Product = InferSelectModel<typeof products>;
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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (cartItems) => ({
    pk: primaryKey(cartItems.userId, cartItems.productId),
  })
);
export type CartItem = InferSelectModel<typeof cartItems>;
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
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (likes) => ({
    pk: primaryKey(likes.userId, likes.productId),
  })
);
export type Like = InferSelectModel<typeof likes>;
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

export const collections = mysqlTable("collection", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  privacy: mysqlEnum("privacy", ["public", "private", "unlisted"])
    .default("private")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
});
export type Collection = InferSelectModel<typeof collections>;
export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  collectionProducts: many(collectionProducts),
}));

export const collectionProducts = mysqlTable(
  "collection-product",
  {
    collectionId: varchar("collectionId", { length: 255 }).notNull(),
    productId: varchar("productId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (collectionProducts) => ({
    pk: primaryKey(
      collectionProducts.collectionId,
      collectionProducts.productId
    ),
  })
);
export type CollectionProduct = InferSelectModel<typeof collectionProducts>;
export const collectionProductRealtions = relations(
  collectionProducts,
  ({ one }) => ({
    collection: one(collections, {
      fields: [collectionProducts.collectionId],
      references: [collections.id],
    }),
  })
);

export const purchases = mysqlTable(
  "purchases",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    productId: varchar("productId", { length: 255 }).notNull(),
    cost: double("cost", { precision: 10, scale: 2 }).notNull().default(0.0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (purchases) => ({
    pk: primaryKey(purchases.userId, purchases.productId),
  })
);
export type Purchase = InferSelectModel<typeof purchases>;
export const purchaseRealtions = relations(purchases, ({ one }) => ({
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
}));
