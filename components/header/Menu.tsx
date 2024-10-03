import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  navItems?: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <a
        href={item.url}
        title={item.name}
      >
        {item.name}
      </a>
    );
  }

  return (
    <div class="collapse !outline-none">
      <input type="checkbox" class="peer !z-10" checked />

      <div class="flex items-center justify-between collapse-title py-0 pl-0 pr-4 lg:pr-14 after:flex after:items-center after:justify-center after:rounded-full after:border-2 after:border-white after:content-['+'] peer-checked:after:content-['-'] after:w-12 after:h-12 after:text-2xl h-fit">
        <a href={item.url} class="!z-20">{item.name}</a>
      </div>

      <div class="collapse-content px-0 !py-0.5">
        <ul class="flex flex-col gap-2">
          {item.children?.map((node) => (
            <li class="pl-4">
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems = [] }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="favorite" />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/account"
          >
            <Icon id="account_circle" />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
