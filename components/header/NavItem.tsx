import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

function NavItem(
  { item, index }: { item: SiteNavigationElement; index: number },
) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li
      class="group flex items-center pr-5"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class="group-hover:underline text-sm font-medium"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`${
              index! > 5 && "translate-x-1/2 -left-1/2 flex-row-reverse"
            } absolute hidden hover:flex group-hover:flex bg-base-100 z-50 justify-start items-stretch w-[360px] h-[300px]`}
            style={{
              top: HEADER_HEIGHT_DESKTOP,
            }}
          >
            {image && (
              <Image
                src={image.url!}
                alt={image.alternateName}
                width={330}
                height={300}
                loading="lazy"
                decoding="async"
              />
            )}

            <ul class="flex flex-wrap flex-col p-4 bg-white mt-[-1px]">
              <li class="flex items-center justify-center p-2 border opacity-90 hover:opacity-100 transition-colors duration-100 max-w-[80px]">
                <a href={url}>Ver tudo</a>
              </li>

              {children.map((node) => (
                <li class="p-2 opacity-90 hover:opacity-100 transition-colors duration-100">
                  <a
                    class="block min-w-[170px]"
                    href={node.url}
                  >
                    <span>{node.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
