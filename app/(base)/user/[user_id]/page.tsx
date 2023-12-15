import { Product } from "@/db/schema";

import { getUserLikes } from "@/lib/actions/like";
import { getProduct } from "@/lib/actions/product";
import { Empty } from "@/components/empty";
import { ProductsList } from "@/components/product/products-list";

interface Props {
  params: {
    user_id: string;
  };
}

export default async function UserLikesPage({ params }: Props) {
  const userLikes = await getUserLikes(params.user_id);
  const userLikedProducts: Product[] = [];

  await Promise.all(
    userLikes.map(async (like) => {
      const product = await getProduct(like.productId);

      if (product) {
        userLikedProducts.push(product);
      }
    })
  );

  if (!userLikedProducts.length) {
    return <Empty icon="heart" message="No likes yet" />;
  }

  return (
    <div>
      {userLikedProducts && <ProductsList products={userLikedProducts} />}
    </div>
  );
}
