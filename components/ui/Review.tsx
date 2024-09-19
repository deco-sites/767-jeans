import { AggregateRating, Review as ReviewProps } from "apps/commerce/types.ts";
import Rating from "./Rating.tsx";

export interface Props {
  reviews: ReviewProps[];
  aggregateRating: AggregateRating;
}

export default function Review({ aggregateRating }: Props) {
  const ratingValue = aggregateRating.ratingValue ?? 0;
  const ratingCount = aggregateRating.ratingCount ?? 0;

  return (
    <div class="flex flex-col gap-1.5">
      <div class="flex flex-col gap-0.5">
        <Rating
          maxRating={5}
          rating={Math.floor(ratingValue)}
          size="rating-sm"
        />
        <span class="font-medium">
          {`${ratingValue} Classificação média (${ratingCount} avaliações)`}
        </span>
      </div>
    </div>
  );
}
