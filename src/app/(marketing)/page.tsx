import { Products } from "@/components/products";

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col gap-4 items-center text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Elevate your digital lifestyle today.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Shop with Voxellax and experience the future at your fingertips!
            🌐💫
          </p>
        </div>
      </section>

      <section>
        <div className="container space-y-3">
          <h1 className="text-2xl font-medium capitalize">For you</h1>
          <Products />
        </div>
      </section>
    </>
  );
}
