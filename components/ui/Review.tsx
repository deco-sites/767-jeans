import { AggregateRating, Review as ReviewProps } from "apps/commerce/types.ts";
import Rating from "./Rating.tsx";

export interface Props {
  reviews: ReviewProps[];
  aggregateRating: AggregateRating;
}

function formatDate(dateString: string): string {
  const publishedDate = new Date(dateString);
  const currentDate = new Date();

  if (isNaN(publishedDate.getTime())) {
    return "data inválida";
  }

  const differenceInMilliseconds = currentDate.getTime() -
    publishedDate.getTime();

  const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
  const monthsDifference = Math.floor(
    differenceInMilliseconds / millisecondsPerMonth,
  );

  return monthsDifference > 0
    ? `${monthsDifference} meses atrás`
    : "recentemente";
}

export default function Review({ reviews, aggregateRating }: Props) {
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

      <ul class="flex flex-col gap-1">
        {reviews.map((review) => (
          <div class="collapse collapse-arrow rounded-none border-b-4">
            <input type="checkbox" />

            <div class="collapse-title px-0">
              <div class="flex items-center gap-2">
                <Rating
                  maxRating={5}
                  rating={Number(review.reviewHeadline)}
                  size="rating-sm"
                />
                <span class="font-medium">{review.reviewHeadline}</span>
              </div>
            </div>

            <div class="collapse-content px-0">
              <div class="flex flex-col gap-2.5 font-normal">
                <span>
                  Enviado <b>{formatDate(review.datePublished!)}</b> por{" "}
                  <b>{review?.author?.[0].name}</b>
                </span>
                <p class="font-medium">{review.reviewBody}</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
