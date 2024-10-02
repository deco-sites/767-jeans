import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
// import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import PromotionTable from "./promotion/PromotionTable.tsx";
import { MeasurementTable } from "./measurement/MeasurementTable.tsx";
// import Rating from "../ui/Rating.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf, additionalProperty = [] } = product;
  const title = isVariantOf?.name ?? product.name;

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
    installments,
  } = useOffer(offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  const discountOnPix = offers?.offers?.[0]?.teasers?.find((teaser) =>
    teaser.name.includes("DESCONTO NO PIX")
  )?.effects?.parameters?.[0]?.value;
  const pixPrice = discountOnPix
    ? (price - ((Number(discountOnPix) / 100) * price))
    : null;
  const roundedPixPrice = (pixPrice && Math.floor(pixPrice * 100) / 100) ??
    null;
  const formattedPixPrice = roundedPixPrice?.toFixed(2) ?? null;

  const hasProgressiveDiscount = additionalProperty.find((item) =>
    item.value === "Desconto Progressivo"
  );

  const isAvailability = availability === "https://schema.org/InStock";

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  const size = additionalProperty.find((item) => item.name === "Tamanho")
    ?.value;

  return (
    <div {...viewItemEvent} class="flex flex-col" id={id}>
      {/* Price tag */}
      {hasProgressiveDiscount && (
        <span class="text-xs/4 text-black bg-[#ececec] uppercase font-bold text-center rounded-badge px-4 py-1 mt-4 xl:mt-0 mb-4 w-fit">
          Desconto Progressivo
        </span>
      )}

      {/* Product Name */}
      <span class="text-2xl leading-7 font-medium">
        {title}
      </span>

      {/* Prices */}
      <div class="flex flex-col gap-0 pt-4">
        <div class="flex items-center gap-3 pt-1">
          <span class="text-lg font-medium text-base-400">
            {formatPrice(price, offers?.priceCurrency)}
          </span>

          {(listPrice ?? 0) > price && (
            <span class="line-through text-sm font-medium text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
        </div>

        {formattedPixPrice && (
          <span class="text-primary text-xl font-medium">
            R$ {formattedPixPrice.replace(".", ",")} no <b>PIX</b>
          </span>
        )}

        {installments && (
          <span class="text-sm/4 font-normal">
            ou em até {installments.replace(".", ",")}
          </span>
        )}

        {
          /* {(product?.aggregateRating?.ratingValue ?? 0) > 0 && (
          <div class="mt-0.5">
            <Rating
              maxRating={5}
              rating={Math.floor(product!.aggregateRating!.ratingValue!)}
              size="rating-sm"
            />
          </div>
        )} */
        }
      </div>

      {isAvailability && hasProgressiveDiscount && (
        <div class="mt-4 sm:mt-6">
          <PromotionTable />
        </div>
      )}

      {/* Sku Selector */}
      {hasValidVariants && (
        <div className="mt-4 sm:mt-6">
          <ProductSelector product={product} />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-6 flex flex-col gap-2">
        {isAvailability
          ? (
            <>
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="btn btn-primary rounded-md no-animation min-h-[60px] max-h-[60px] font-medium text-sm"
                disabled={false}
              />
              {/* <WishlistButton item={item} /> */}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {size && isAvailability && (
        <div class="mt-4 sm:mt-6">
          <MeasurementTable size={size} />
        </div>
      )}

      {/* Shipping Simulation */}
      {isAvailability && (
        <div class="mt-8">
          <ShippingSimulationForm
            items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
          />
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
