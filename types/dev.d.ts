export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string | null;
  createdAt: string;
  updatedAt: string;
  storeId: string;
};

export type License = {
  id: string;
  type: string;
  price: number;
  productId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  profileImageUrl: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Reviews = {
  id: string;
  message: string;
  rate: number;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: string;
  name: string;
  privacy: string;
  userId: string;
};
