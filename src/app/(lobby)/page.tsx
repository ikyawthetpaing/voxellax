import { SearchForm } from "@/components/form/search-form";
import { Products } from "@/components/products";
import { Heading } from "@/components/ui/heading";

import { db } from "@/lib/db";

export default async function IndexPage() {
  const products = await db.product.findMany();
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-semibold text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate your digital lifestyle today.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Shop with Voxellax and experience the future at your fingertips!
              🌐💫
            </p>
          </div>
          <SearchForm size="lg" />
        </div>
      </section>

      <section>
        <div className="container space-y-4">
          <Heading>Popular products</Heading>
          <Products products={products}/>
        </div>
      </section>
    </>
  );
}
