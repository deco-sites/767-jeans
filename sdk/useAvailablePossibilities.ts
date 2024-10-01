import { ProductLeaf } from "apps/commerce/types.ts";
import { relative } from "./url.ts";
import { useOffer } from "./useOffer.ts";

export const useAvailablePossibilities = ({
  productUrl,
  variants = [],
}: {
  productUrl: string;
  variants: ProductLeaf[];
}): boolean => {
  const product = variants.find((item) => relative(item.url) === productUrl);

  const { availability } = useOffer(product?.offers);

  return availability === "https://schema.org/InStock";
};
