import { Product } from "@/db/schema";

import { getUserLikes } from "@/lib/actions/like";
import { getProduct } from "@/lib/actions/product";
import { ProductsList } from "@/components/product/products-list";

interface UserLikesPageProps {
  params: {
    userId: string;
  };
}

export default async function UserLikesPage({ params }: UserLikesPageProps) {
  const userId = params.userId;

  const userLikes = await getUserLikes(userId);
  const userLikedProducts: Product[] = [];

  await Promise.all(
    userLikes.map(async (like) => {
      const product = await getProduct(like.productId);

      if (product) {
        userLikedProducts.push(product);
      }
    })
  );

  return (
    <div>
      {userLikedProducts && <ProductsList products={userLikedProducts} />}
    </div>
  );
}
