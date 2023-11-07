import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSubcategory } from "@/config/category";
import { priceRangeFilterItem } from "@/config/filter";
import { siteConfig } from "@/config/site";

import { getProducts } from "@/lib/actions/product";
import { absoluteUrl } from "@/lib/utils";
import { Heading } from "@/components/heading";
import { ProductsListWithFilter } from "@/components/product/products-list-with-filter";
import { Shell } from "@/components/shell";

interface Props {
  params: {
    category: string;
    subcategory: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subcategory = getSubcategory(params.category, params.subcategory);

  if (!subcategory) {
    return {};
  }

  const ogUrl = new URL(siteConfig.ogImage);
  ogUrl.searchParams.set("heading", subcategory.label);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: subcategory.label,
    description: subcategory.description,
    openGraph: {
      title: subcategory.label,
      description: subcategory.description,
      type: "website",
      url: absoluteUrl(`/category/${params.category}/${subcategory.value}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 900,
          alt: subcategory.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: subcategory.label,
      description: subcategory.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const subcategory = getSubcategory(params.category, params.subcategory);

  if (!subcategory) {
    notFound();
  }

  const { page, per_page, sort, price_range } = searchParams;

  const _page = typeof page === "string" ? page : "1";

  const limit = typeof per_page === "string" ? parseInt(per_page) : 6;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const { count: productCount, items: products } = await getProducts({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: params.category,
    subcategories: params.subcategory,
    price_range: typeof price_range === "string" ? price_range : null,
  });

  const pageCount = Math.ceil(productCount / limit);

  return (
    <Shell>
      <div className="grid gap-6">
        <Heading size="xl" className="text-center">
          {subcategory.label}
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
          page={_page}
          pageCount={pageCount}
        />
      )}
    </Shell>
  );
}
