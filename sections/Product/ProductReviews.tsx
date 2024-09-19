import Section from "../../components/ui/Section.tsx";
import Review from "../../components/ui/Review.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductReviews({ page }: Props) {
  if (!page || !page.product) return null;

  const { review, aggregateRating } = page.product;

  if (!review || !aggregateRating || review.length === 0) return null;

  return (
    <Section.Container>
      <Section.Header title="OPINIÃO DE QUEM COMPROU" />

      <Review reviews={review} aggregateRating={aggregateRating} />
    </Section.Container>
  );
}

export const LoadingFallback = () => (
  <Section.Container>
    <Section.Placeholder height="471px" />;
  </Section.Container>
);
