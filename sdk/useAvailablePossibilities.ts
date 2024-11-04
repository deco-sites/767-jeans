import { ProductLeaf } from "apps/commerce/types.ts";
import { relative } from "./url.ts";
import { useOffer } from "./useOffer.ts";

export const AVAILABILITY_IN_STOCK = "https://schema.org/InStock";

export const useProductByUrl = (variants: ProductLeaf[], url: string): ProductLeaf | undefined => {
  return variants.find((item) => relative(item.url) === url);
};

export const useVariantAvailability = (offers: any): boolean => {
  const { availability } = useOffer(offers);
  return availability === AVAILABILITY_IN_STOCK;
};

export const useAvailablePossibilities = ({
  productUrl,
  variants = [],
}: {
  productUrl: string;
  variants: ProductLeaf[];
}): boolean => {
  const product = useProductByUrl(variants, productUrl);
  if (!product || !product.offers) {
    return false;
  }

  return useVariantAvailability(product.offers);
};