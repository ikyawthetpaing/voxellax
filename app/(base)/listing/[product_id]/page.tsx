import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { getProduct } from "@/lib/actions/product";
import { getReviews } from "@/lib/actions/review";
import { getStoreById } from "@/lib/actions/store";
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

interface ProductPageProps {
  params: {
    product_id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
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

export default async function ListingPage({
  params,
  searchParams,
}: ProductPageProps) {
  const product = await getProduct(params.product_id);
  if (!product) notFound();

  const store = await getStoreById(product.storeId);
  if (!store) return null;

  const seller = await getUser(store.userId);
  if (!seller) return null;

  const { page, per_page } = searchParams;

  // Products transaction
  const _page = typeof page === "string" ? page : "1";
  const limit = typeof per_page === "string" ? parseInt(per_page) : 3;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const { count: reviewCount, items: reviews } = await getReviews({
    limit,
    offset,
  });
  const pageCount = Math.ceil(reviewCount / limit);
  const totalRates = reviews.reduce((sum, review) => sum + review.rate, 0);
  const averageRate = totalRates / reviewCount;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Heading className="line-clamp-2">{product.name}</Heading>
          <p className="sr-only">{product.description}</p>
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
            <Reviews
              reviews={reviews}
              totalReviews={reviewCount}
              className="hidden lg:grid"
              page={_page}
              per_page={String(limit)}
              pageCount={pageCount}
            />
          </div>
          <div className="flex flex-col gap-8">
            <DetailsCard
              className="lg:w-96"
              product={product}
              averageRate={averageRate}
              totalReviews={reviewCount}
            />
            <div>
              <Infos
                className="lg:w-96"
                product={product}
                store={store}
                seller={seller}
              />
              <Reviews
                reviews={reviews}
                totalReviews={reviewCount}
                className="lg:hidden"
                page={_page}
                per_page={String(limit)}
                pageCount={pageCount}
              />
            </div>
          </div>
        </div>
        <StoreRelatedProducts storeId={store.id} />
      </div>
    </Shell>
  );
}
