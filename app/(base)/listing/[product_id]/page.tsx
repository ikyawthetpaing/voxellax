import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { getProduct } from "@/lib/actions/product";
import { getStore } from "@/lib/actions/store";
import { getUser } from "@/lib/actions/user";
import { absoluteUrl, getProductThumbnailImage } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { DetailsCard } from "@/components/listing/details-card";
import { ImageGallery } from "@/components/listing/image-gallery";
import { Infos } from "@/components/listing/infos";
import { Reviews } from "@/components/listing/reviews";
import { StoreRelatedProducts } from "@/components/listing/store-related-products";
import { Shell } from "@/components/shell";

// below still in development
export type Review = {
  message: string;
  rate: 1 | 2 | 3 | 4 | 5;
  name: string;
  createdAt: Date;
};

const reviews: Review[] = [
  {
    message: "Great product!",
    rate: 5,
    name: "John Doe",
    createdAt: new Date("2023-09-29T10:00:00Z"),
  },
  {
    message: "Good quality.",
    rate: 4,
    name: "Jane Smith",
    createdAt: new Date("2023-09-29T09:30:00Z"),
  },
  {
    message: "Could be better.",
    rate: 3,
    name: "Alice Johnson",
    createdAt: new Date("2023-09-28T15:45:00Z"),
  },
  {
    message: "Not satisfied.",
    rate: 2,
    name: "Bob Brown",
    createdAt: new Date("2023-09-28T14:20:00Z"),
  },
  {
    message: "Terrible experience!",
    rate: 1,
    name: "Eve Wilson",
    createdAt: new Date("2023-09-27T20:15:00Z"),
  },
];
// above still in development

interface ProductPageProps {
  params: {
    product_id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.product_id);

  if (!product) {
    return {};
  }

  const thumbnailImage = getProductThumbnailImage(product.images);
  const thumbnailUrl = thumbnailImage ? thumbnailImage.url : siteConfig.ogImage;

  const ogUrl = new URL(thumbnailUrl);
  ogUrl.searchParams.set("heading", product.name);
  ogUrl.searchParams.set("type", "Listing product");
  ogUrl.searchParams.set("mode", "dark");

  const description =
    product.description || `Check out ${product.name} on ${siteConfig.name}`;

  return {
    title: product.name,
    description: description,
    openGraph: {
      siteName: siteConfig.name,
      title: product.name,
      description: description,
      type: "article",
      url: absoluteUrl(`/listing/${product.id}`),
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: description,
      images: [ogUrl],
    },
  };
}

export default async function ListingPage({ params }: ProductPageProps) {
  const product = await getProduct(params.product_id);

  if (!product) {
    notFound();
  }

  const store = await getStore(product.storeId);
  const seller = await getUser(store?.userId || "");

  if (!store || !seller) return null;

  // dev
  const totalRates = reviews.reduce((sum, review) => sum + review.rate, 0);
  const averageRate = totalRates / reviews.length;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Heading className="line-clamp-2">{product.name}</Heading>
          <Link href={`/store/${store.id}`}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={store.avatar?.url} alt={store.avatar?.name} />
                <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <h3>{store.name}</h3>
                {store.verified && (
                  <Icons.verified className="h-4 w-4 text-blue-500" />
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="grid gap-8 lg:flex">
          <div className="flex flex-1 flex-col gap-8">
            <ImageGallery product={product} />
            <Reviews reviews={reviews} className="hidden lg:grid" />
          </div>
          <div className="flex flex-col gap-8">
            <DetailsCard
              className="lg:w-96"
              product={product}
              averageRate={averageRate}
              totalReviews={reviews.length}
            />
            <div>
              <Infos
                className="lg:w-96"
                product={product}
                store={store}
                seller={seller}
              />
              <Reviews reviews={reviews} className="lg:hidden" />
            </div>
          </div>
        </div>
        <StoreRelatedProducts storeId={store.id} />
      </div>
    </Shell>
  );
}
