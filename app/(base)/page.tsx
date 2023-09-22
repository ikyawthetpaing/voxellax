import Link from "next/link";

import { getTrendingCategories } from "@/config/category";
import { productTags } from "@/config/product";
import { getProducts } from "@/lib/actions/product";
import { CategoryBox } from "@/components/category-box";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/products-list";
import { Search } from "@/components/search";
import { Shell } from "@/components/shell";

export default async function IndexPage() {
  const products = await getProducts({
    limit: 4,
    offset: 0,
  });
  const trendingCategories = getTrendingCategories();
  return (
    <Shell>
      <section className="grid gap-8 pt-8 md:gap-12 md:pt-12 lg:gap-20 lg:pt-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate your digital lifestyle today.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Shop with Voxellax and experience the future at your fingertips!
              🌐💫
            </p>
          </div>
          <div className="w-full sm:w-[600px]">
            <Search size="lg" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {productTags.map((value) => (
              <Link href={`/search?query=${value}`}>
                <div className="group flex items-center gap-2 rounded-2xl border px-7 py-3 hover:bg-accent">
                  <Icons.search className="hidden h-4 w-4 transition group-hover:block" />
                  <p>{value}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Heading>Browse Trending Categories</Heading>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {trendingCategories.map(({ title, href }) => (
              <CategoryBox title={title} herf={href} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Heading>Latest products</Heading>
          <ProductsList products={products} />
        </div>
      </section>
    </Shell>
  );
}
