import { Metadata } from "next";
import { data } from "@/constants/data-dev";

import { Product } from "@/types/dev";
import { ProductsList } from "@/components/products-list";

export const metadata: Metadata = {
  title: "Likes",
  description: "View you liked products",
};

interface UserLikesPageProps {
  params: {
    userId: string;
  };
}

export default async function UserLikesPage({ params }: UserLikesPageProps) {
  const liked = data.likes.filter(({ userId }) => userId === params.userId);
  const likedProducts: Product[] = [];
  liked.map(({ productId }) => {
    const product = data.products.find(({ id }) => id === productId);
    if (product) {
      likedProducts.push(product);
    }
  });

  return (
    <div>{likedProducts && <ProductsList products={likedProducts} />}</div>
  );
}
