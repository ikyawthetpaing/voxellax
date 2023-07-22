import { Products } from "@/components/products";

import data from "@/helpers/data.json"; // <- for dev
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Likes",
  description: "View you liked products",
};

export default function UserLikesPage() {
  const likedProducts = data.likes.map((like) => {
    const product = data.products.find(({ id }) => id === like.productId);
    if (product) {
      return product;
    }
  });

  return (
    <div>
      comming soon
      {/* {likedProducts && <Products products={likedProducts} />} */}
    </div>
  );
}
