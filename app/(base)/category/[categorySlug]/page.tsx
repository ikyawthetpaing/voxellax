import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategory } from "@/config/category";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/actions/product";
import { absoluteUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/products-list";
import { Shell } from "@/components/shell";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategory(params.categorySlug);

  if (!category) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", category.title);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: category.title,
    description: category.description,
    authors: [{ name: siteConfig.name, url: url }, ...siteConfig.authors],
    openGraph: {
      title: category.title,
      description: category.description,
      type: "website",
      url: absoluteUrl(`/category/${category.slug}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = getCategory(params.categorySlug);

  if (!category) {
    notFound();
  }

  const subCategories = category.subcategories;

  const { page, per_page, sort, subcategories, price_range, store_ids } =
    searchParams;

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const products = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category.slug,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
  });

  return (
    <Shell>
      <div className="grid gap-6">
        <Heading size="xl" className="text-center">
          {category.title}
        </Heading>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-foreground/75">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center">
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory.slug}
            href={`/category/${category.slug}/${subCategory.slug}`}
          >
            <div className="rounded-lg border hover:bg-accent sm:w-48">
              <AspectRatio ratio={4 / 3}>
                <Heading
                  size="sm"
                  className="flex h-full w-full items-center justify-center text-center font-medium text-muted-foreground"
                >
                  {subCategory.title}
                </Heading>
              </AspectRatio>
            </div>
          </Link>
        ))}
      </div>
      {products && <ProductsList products={products} />}
    </Shell>
  );
}
