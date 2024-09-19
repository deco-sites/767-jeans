export interface Props {
  rating: number;
  maxRating: number;
  size?: "rating-xs" | "rating-sm" | "rating-md" | "rating-lg";
}

export default function Rating(
  { rating, maxRating, size = "rating-lg" }: Props,
) {
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

  return (
    <div class={`rating ${size}`}>
      {stars.map((_, idx) => {
        return (
          <input
            type="radio"
            name="rating"
            class="mask mask-star-2 bg-[#ffc500]"
            disabled
            readOnly
            checked={idx + 1 === rating}
          />
        );
      })}
    </div>
  );
}
