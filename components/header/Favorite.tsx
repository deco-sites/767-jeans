import { asset } from "$fresh/runtime.ts";

function Favorite() {
  return (
    <a href="/wishlist" class="btn btn-square btn-sm btn-ghost no-animation">
      <img
        id="favorite"
        src={asset("/image/favorite.png")}
        alt="Favorite Icon"
        width={24}
        height={24}
      />
    </a>
  );
}

export default Favorite;
