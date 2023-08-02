import { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { Products } from "@/components/products";
import { db } from "@/lib/db";
import { productCategories } from "@/config/category";
import { siteConfig } from "@/config/site";
import { Shell } from "@/components/shell";
import { Heading } from "@/components/ui/heading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    category_id: string;
  };
}

function getCategory(collectionId: string) {
  const category = productCategories.find(({ slug }) => slug === collectionId);
  return category;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategory(params.category_id);

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
    authors: [{ name: siteConfig.name, url: url }],
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.category_id);

  if (!category) {
    notFound();
  }

  const subCategories = category.subcategories;

  const products = await db.product.findMany({
    where: { category: category.slug },
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
      {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory.slug}
            href={`/category/${category.slug}/${subCategory.slug}`}
          >
            <div className="rounded-lg border hover:bg-accent">
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
      </div> */}
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
      {products && <Products products={products} />}
    </Shell>
  );
}
