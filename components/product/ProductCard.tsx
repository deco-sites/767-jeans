import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 320;
const HEIGHT = 480;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, installments } = useOffer(offers);
  // const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  const priceDifference =
    (Math.round(price ?? 0) / Math.round(listPrice ?? 0)) * 100;

  const discountOnPix = offers?.offers?.[0]?.teasers?.find((teaser) =>
    teaser.name.includes("DESCONTO NO PIX")
  )?.effects?.parameters?.[0]?.value;
  const pixPrice = discountOnPix
    ? (price! - ((Number(discountOnPix) / 100) * price!))
    : null;
  const roundedPixPrice = (pixPrice && Math.floor(pixPrice * 100) / 100) ??
    null;
  const formattedPixPrice = roundedPixPrice?.toFixed(2) ?? null;

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm", _class)}
    >
      <figure
        class="relative rounded-none"
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "w-full",
              "col-span-full row-span-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "w-full",
              "col-span-full row-span-full",
              "transition-opacity opacity-0 lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        {listPrice !== price && priceDifference >= 50 && (
          <div class="flex items-center justify-center absolute top-2 left-2 p-2 rounded-md bg-error text-white">
            -{priceDifference}%
          </div>
        )}
      </figure>

      <a href={relativeUrl} class="pt-5">
        <span class="font-medium line-clamp-2 xl:line-clamp-none">
          {title}
        </span>

        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 pt-2">
            {(listPrice ?? 0) > (price ?? 0) && (
              <span class="line-through font-medium text-gray-400">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}

            <span class="font-bold text-base-400">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          {formattedPixPrice && (
            <span class="text-primary font-medium">
              R$ {formattedPixPrice.replace(".", ",")} no <b>PIX</b>
            </span>
          )}

          {installments && (
            <span class="font-medium text-[#717171]">
              {installments.replace(".", ",")}
            </span>
          )}
        </div>
      </a>

      {
        /* <div>
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-50",
                "btn-primary hover:!text-primary disabled:!text-primary",
              )}
            />
          )
          : (
            <a
              href={relativeUrl}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-75",
                "btn-error hover:!text-error disabled:!text-error",
              )}
            >
              Sold out
            </a>
          )}
      </div> */
      }
    </div>
  );
}

export default ProductCard;
