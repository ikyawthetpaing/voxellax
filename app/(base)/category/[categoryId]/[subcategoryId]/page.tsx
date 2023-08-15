import { Metadata } from "next";
import { notFound } from "next/navigation";
import { data } from "@/constants/data-dev";

import { productCategories } from "@/config/category";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Heading } from "@/components/heading";
import { ProductsList } from "@/components/products-list";
import { Shell } from "@/components/shell";

interface SubcategoryPageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
}

function getSubategory(categoryId: string, subcategoryId: string) {
  const subcategory = productCategories
    .find((category) => category.slug === categoryId)
    ?.subcategories.find((subcategory) => subcategory.slug === subcategoryId);
  return subcategory;
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const subcategory = getSubategory(params.categoryId, params.subcategoryId);

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
    authors: [{ name: siteConfig.name, url: url }],
    openGraph: {
      title: subcategory.title,
      description: subcategory.description,
      type: "website",
      url: absoluteUrl(`/category/${params.categoryId}/${subcategory.slug}`),
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
}: SubcategoryPageProps) {
  const subcategory = getSubategory(params.categoryId, params.subcategoryId);

  if (!subcategory) {
    notFound();
  }

  const products = data.products.filter(
    ({ subcategory }) => subcategory === params.subcategoryId
  );

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
      {products && <ProductsList products={products} />}
    </Shell>
  );
}
