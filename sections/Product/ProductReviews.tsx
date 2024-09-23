import Section from "../../components/ui/Section.tsx";
import Review from "../../components/product/review/Review.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import SubscriptionModal from "../../components/product/review/SubscriptionModal.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

function NotFound({ page }: Props) {
  return (
    <Section.Container class="border-b-4 pb-2.5 mb-10">
      <Section.Header title="OPINIÃO DE QUEM COMPROU" />

      <SubscriptionModal
        productId={page?.product?.inProductGroupWithID ??
          page?.product["@id"] ?? ""}
        status={undefined}
      />

      <span class="text-lg leading-6 font-medium">Sem avaliações.</span>
    </Section.Container>
  );
}

export default function ProductReviews({ page }: Props) {
  if (!page || !page.product) return null;

  const { review, aggregateRating } = page.product;

  if (!review || !aggregateRating || review.length === 0) {
    return <NotFound page={page} />;
  }

  return (
    <Section.Container>
      <Section.Header title="OPINIÃO DE QUEM COMPROU" />

      <SubscriptionModal
        productId={page.product.inProductGroupWithID ?? page.product["@id"] ??
          ""}
        status={undefined}
      />

      <Review reviews={review} aggregateRating={aggregateRating} />
    </Section.Container>
  );
}

export const LoadingFallback = () => (
  <Section.Container>
    <Section.Placeholder height="471px" />;
  </Section.Container>
);
