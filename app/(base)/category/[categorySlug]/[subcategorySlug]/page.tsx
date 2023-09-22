import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSubcategory } from "@/config/category";
import { priceRangeFilterItem } from "@/config/filter";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/actions/product";
import { absoluteUrl } from "@/lib/utils";
import { Heading } from "@/components/heading";
import { ProductsListWithFilter } from "@/components/products-list-with-filter";
import { Shell } from "@/components/shell";

interface SubcategoryPageProps {
  params: {
    categorySlug: string;
    subcategorySlug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const subcategory = getSubcategory(
    params.categorySlug,
    params.subcategorySlug
  );

  if (!subcategory) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", subcategory.title);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: subcategory.title,
    description: subcategory.description,
    authors: [{ name: siteConfig.name, url: url }, ...siteConfig.authors],
    openGraph: {
      title: subcategory.title,
      description: subcategory.description,
      type: "website",
      url: absoluteUrl(`/category/${params.categorySlug}/${subcategory.slug}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: subcategory.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: subcategory.title,
      description: subcategory.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const subcategory = getSubcategory(
    params.categorySlug,
    params.subcategorySlug
  );

  if (!subcategory) {
    notFound();
  }

  const { page, per_page, sort, price_range } = searchParams;

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const products = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: params.categorySlug,
    subcategories: params.subcategorySlug,
    price_range: typeof price_range === "string" ? price_range : null,
  });

  return (
    <Shell>
      <div className="grid gap-6">
        <Heading size="xl" className="text-center">
          {subcategory.title}
        </Heading>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-foreground/75">
            {subcategory.description}
          </p>
        </div>
      </div>
      {products && (
        <ProductsListWithFilter
          products={products}
          filterItems={[priceRangeFilterItem]}
        />
      )}
    </Shell>
  );
}
