import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategory } from "@/config/category";
import { priceRangeFilterItem, subcategoriesFilterItem } from "@/config/filter";
import { siteConfig } from "@/config/site";

import { getProducts } from "@/lib/actions/product";
import { absoluteUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heading } from "@/components/heading";
import { ProductsListWithFilter } from "@/components/products-list-with-filter";
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

  const ogUrl = new URL(siteConfig.ogImage);
  ogUrl.searchParams.set("heading", category.label);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: category.label,
    description: category.description,
    authors: [
      { name: siteConfig.name, url: siteConfig.url },
      ...siteConfig.authors,
    ],
    openGraph: {
      title: category.label,
      description: category.description,
      type: "website",
      url: absoluteUrl(`/category/${category.value}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: category.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.label,
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

  const { page, per_page, sort, subcategories, price_range } = searchParams;

  // Products transaction
  const _page = typeof page === "string" ? page : "1";

  const limit = typeof per_page === "string" ? parseInt(per_page) : 6;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const { count: productCount, items: products } = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category.value,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
  });

  const pageCount = Math.ceil(productCount / limit);

  return (
    <Shell>
      <div className="grid gap-6">
        <Heading size="xl" className="text-center">
          {category.label}
        </Heading>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-foreground/75">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center">
        {category.subcategories.map((subCategory) => (
          <Link
            key={subCategory.value}
            href={`/category/${category.value}/${subCategory.value}`}
          >
            <div className="rounded-lg border hover:bg-accent sm:w-48">
              <AspectRatio ratio={4 / 3}>
                <Heading
                  size="sm"
                  className="flex h-full w-full items-center justify-center text-center font-medium text-muted-foreground"
                >
                  {subCategory.label}
                </Heading>
              </AspectRatio>
            </div>
          </Link>
        ))}
      </div>
      {products && (
        <ProductsListWithFilter
          products={products}
          filterItems={[
            subcategoriesFilterItem(category.value),
            priceRangeFilterItem,
          ]}
          page={_page}
          pageCount={pageCount}
        />
      )}
    </Shell>
  );
}
