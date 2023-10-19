import { Product } from "@/db/schema";

import { getUserLikes } from "@/lib/actions/like";
import { getProduct } from "@/lib/actions/product";
import { Icons } from "@/components/icons";
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

  if (!userLikedProducts.length) {
    return (
      <div>
        <div className="mt-14 flex flex-col items-center">
          <Icons.heart
            className="mb-4 h-16 w-16 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xl font-medium text-muted-foreground">
            No likes yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userLikedProducts && <ProductsList products={userLikedProducts} />}
    </div>
  );
}
