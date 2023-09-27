import Link from "next/link";

import { baseConfig } from "@/config/base";
import { getTrendingCategories } from "@/config/category";
import { productTags } from "@/config/product";
import { siteConfig } from "@/config/site";

import { getProducts } from "@/lib/actions/product";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryBox } from "@/components/category-box";
import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { ProductsList } from "@/components/products-list";
import { Search } from "@/components/search";
import { Shell } from "@/components/shell";

export default async function IndexPage() {
  const trendingCategories = getTrendingCategories();
  return (
    <Shell>
      <section className="grid gap-8 pt-8 md:gap-12 md:pt-12 lg:gap-20 lg:pt-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="max-w-[68rem] bg-gradient-to-r from-foreground to-gray-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
              Transform your digital dreams into reality.
            </h1>
            <p className="max-w-[600px] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Our digital products are meticulously crafted to elevate your
              efficiency and simplify your online experience.
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
          <div className="grid grid-cols-3 gap-4 max-[600px]:grid-cols-2 lg:grid-cols-6">
            {trendingCategories.map(({ title, href }) => (
              <CategoryBox title={title} herf={href} />
            ))}
          </div>
        </div>

        {baseConfig.featuredCategories.map(async (categoryValue) => {
          const { items: products } = await getProducts({
            limit: 4,
            offset: 0,
            categories: categoryValue,
          });

          if (!products) {
            return null;
          }

          return (
            <div className="space-y-4">
              <div className="flex justify-between">
                <Heading>Latest {categoryValue}</Heading>
                <Link
                  href={`/category/${categoryValue}`}
                  className="flex items-center gap-2 text-sky-500"
                >
                  <span className="capitalize">Explore {categoryValue}</span>
                  <Icons.chevronRight className="h-5 w-5" />
                </Link>
              </div>
              <ProductsList products={products} />
            </div>
          );
        })}

        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Heading>Begin Your Profit Journey with {siteConfig.name}</Heading>
            <p className="leading-normal text-muted-foreground">
              Monetize your designs by reaching a vast audience of buyers or
              support fellow artists on {siteConfig.name} to boost your
              earnings!
            </p>
            <div>
              <Link href="/seller" className={buttonVariants()}>
                Open a shop
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </Shell>
  );
}
