import { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { Products } from "@/components/products";
import { db } from "@/lib/db";
import { productCategories } from "@/config/category";
import { siteConfig } from "@/config/site";
import { Shell } from "@/components/shell";
import { Heading } from "@/components/ui/heading";

interface SubcategoryPageProps {
  params: {
    category_id: string;
    subcategory_id: string;
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
  const subcategory = getSubategory(params.category_id, params.subcategory_id);

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
      url: absoluteUrl(`/category/${params.category_id}/${subcategory.slug}`),
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
  const subcategory = getSubategory(params.category_id, params.subcategory_id);

  if (!subcategory) {
    notFound();
  }

  const products = await db.product.findMany({
    where: { subcategory: subcategory.slug },
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
      {products && <Products products={products} />}
    </Shell>
  );
}
