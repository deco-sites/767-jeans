import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = false;
  const flexDirection = avatars
    ? "flex-wrap flex-row items-center"
    : "flex-col sm:max-h-[250px] sm:overflow-y-auto sm:scrollbar";

  return (
    <ul class={clx(`flex gap-2`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-1 p-4 sm:p-0">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="collapse collapse-arrow rounded-none">
            <input
              type="checkbox"
              class="peer"
              checked={filter.values.some((item) => item.selected)}
            />

            <div class="collapse-title px-0">
              <span>{filter.label}</span>
            </div>

            <div class="collapse-content px-0">
              <FilterValues {...filter} />
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
