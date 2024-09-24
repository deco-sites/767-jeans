import Section from "../../components/ui/Section.tsx";
import Review from "../../components/product/review/Review.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import SubscriptionModal from "../../components/product/review/SubscriptionModal.tsx";
import { AppContext } from "../../apps/deco/vtex.ts";
import { SectionProps } from "@deco/deco";

export interface Props {
  /** @title Integration */
  page?: ProductDetailsPage | null;
  status?: "success" | "failed";
}

function NotFound({ status, page }: SectionProps<typeof loader>) {
  return (
    <Section.Container class="border-b-4 pb-2.5 mb-10">
      <Section.Header title="OPINIÃO DE QUEM COMPROU" />

      <SubscriptionModal
        status={status}
        productId={page?.product.inProductGroupWithID}
      />

      <span class="text-lg leading-6 font-medium">Sem avaliações.</span>
    </Section.Container>
  );
}

export default function ProductReviews(
  { page, status }: SectionProps<typeof loader>,
) {
  if (!page || !page.product) return null;

  const { review, aggregateRating } = page.product;

  if (!review || !aggregateRating || review.length === 0) {
    return <NotFound status={status} page={page} />;
  }

  return (
    <Section.Container>
      <Section.Header title="OPINIÃO DE QUEM COMPROU" />

      <SubscriptionModal
        status={status}
        productId={page?.product.inProductGroupWithID}
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

export const loader = (
  props: Props,
  _req: Request,
  _ctx: AppContext,
) => {
  return {
    ...props,
  };
};
