import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  console.log(page.product.description);

  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 xl:px-0 max-w-site">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

      <div
        class={clx(
          "grid",
          "grid-cols-1 gap-2 py-0",
          "sm:grid-cols-5 sm:gap-6",
        )}
      >
        <div class="sm:col-span-3">
          <ImageGallerySlider page={page} />
        </div>
        <div class="sm:col-span-2">
          <ProductInfo page={page} />
        </div>
      </div>

      <div class="flex flex-col gap-6 mt-4">
        <h2 class="uppercase font-medium text-xl">Informações do produto</h2>
        <div
          class="font-medium"
          dangerouslySetInnerHTML={{
            __html: page.product.description?.replace(/\r?\n/g, "<br />") || "",
          }}
        />
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
