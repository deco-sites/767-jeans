import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 1812;
const HEIGHT = 2649;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { page: { product: { name, isVariantOf, image: pImages } } } = props;

  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;

  return (
    <>
      <div
        id={id}
        class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-[min-content_1fr] gap-1 sm:gap-5"
      >
        {/* Image Slider */}
        <div class="col-start-1 col-span-1 sm:col-start-2">
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName ?? "Product Image"}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>

        {/* Dots */}
        <div class="col-start-1 col-span-1">
          <ul
            class={clx(
              "carousel carousel-center",
              "sm:carousel-vertical",
              "gap-2",
              "max-w-full",
              "overflow-x-auto",
              "sm:overflow-y-auto",
            )}
            style={{ maxHeight: "600px" }}
          >
            {images.map((img, index) => (
              <li class="carousel-item w-[72px] h-[115px] sm:w-[123px] sm:h-[179px]">
                <Slider.Dot index={index}>
                  <Image
                    class="group-disabled:border-base-400 border w-full h-full aspect-auto"
                    width={123}
                    height={179}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>

        <Slider.JS rootId={id} />
      </div>
    </>
  );
}
