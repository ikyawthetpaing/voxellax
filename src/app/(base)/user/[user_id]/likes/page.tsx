import { Metadata } from "next";
import { db } from "@/lib/db";
import { Products } from "@/components/products";
import { Product } from "@prisma/client";

export const metadata: Metadata = {
  title: "Likes",
  description: "View you liked products",
};

interface UserLikesPageProps {
  params: {
    user_id: string;
  };
}

export default async function UserLikesPage({ params }: UserLikesPageProps) {
  const liked = await db.like.findMany({
    where: { userId: params.user_id },
    select: { productId: true },
  });
  const likedProducts: Product[] = await Promise.all(
    liked.map(async ({ productId }) => {
      if (productId) {
        const product = await db.product.findFirst({
          where: { id: productId },
        });
        return product;
      } else {
        return null;
      }
    })
  ).then((products) =>
    products.filter((product): product is Product => product !== null)
  );
  return <div>{likedProducts && <Products products={likedProducts} />}</div>;
}
