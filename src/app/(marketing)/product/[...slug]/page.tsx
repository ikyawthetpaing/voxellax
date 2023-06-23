import { notFound } from "next/navigation";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { ProductDetails } from "@/components/product-details";

// for dev
import data from "@/helpers/data.json";

interface ProductPageProps {
  params: {
    slug: string[];
  };
}

async function getProduct(id: string) {
  const product = data.products.find((product) => product.id === id);
  if (!product) {
    null;
  }

  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug[0]);

  if (!product) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", product.title);
  ogUrl.searchParams.set("type", "Listing Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: product.title,
    description: product.description,
    // authors: product.authors.map((author) => ({
    //   name: author,
    // })),
    openGraph: {
      title: product.title,
      description: product.description,
      type: "article",
      url: absoluteUrl(`/product/${product.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug[0]);

  if (!product) {
    notFound();
  }

  return (
    <section className="container relative py-10">
      <ProductDetails product={product} />
    </section>
  );
}