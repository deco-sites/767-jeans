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
      {stars.map((star) => (
        <input
          key={star}
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-[#ffc500]"
          checked={rating === star}
        />
      ))}
    </div>
  );
}
