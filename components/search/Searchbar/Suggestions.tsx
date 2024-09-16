import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { relative } from "../../../sdk/url.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import Image from "apps/website/components/Image.tsx";
import { NAME } from "./Form.tsx";
import { SEARCHBAR_POPUP_ID } from "../../../constants.ts";

export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { suggestion };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const query = new URL(req.url).searchParams.get(NAME ?? "q");

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { suggestion };
};

function Suggestions(
  { suggestion }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products?.length ?? 0);
  const hasTerms = Boolean(searches.length);

  return (
    <div
      id={SEARCHBAR_POPUP_ID}
      class={clx(
        `absolute z-50 bg-white w-full xl:px-5`,
        !hasProducts && !hasTerms && "hidden",
      )}
    >
      <div class="grid grid-cols-1">
        <div class="flex flex-col pt-6 gap-2">
          <span
            class="font-medium text-xl"
            role="heading"
            aria-level={3}
          >
            Produtos sugeridos
          </span>

          {products && products.length > 0
            ? (
              <ul class="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto scrollbar px-1 my-4">
                {products?.map(
                  ({ url, name, image: images, offers, isVariantOf }) => {
                    const [front] = images ?? [];
                    const title = isVariantOf?.name ?? name;
                    const { listPrice, price, installments } = useOffer(offers);
                    const relativeUrl = relative(url);

                    const WIDTH = 100;
                    const HEIGHT = 100;

                    return (
                      <li class="flex justify-between gap-2 w-full">
                        <a
                          href={relativeUrl}
                          aria-label="view product"
                          class="contents"
                        >
                          <Image
                            src={front.url!}
                            alt={front.alternateName}
                            width={WIDTH}
                            height={HEIGHT}
                            loading="lazy"
                            decoding="async"
                            class="min-w-[100px] max-w-[100px] h-[150px]"
                          />
                        </a>

                        <a href={relativeUrl}>
                          <span class="font-medium">
                            {title}
                          </span>

                          <div class="flex flex-col gap-1">
                            <div class="flex gap-2 pt-2">
                              {(listPrice ?? 0) > (price ?? 0) && (
                                <span class="line-through font-normal text-gray-400">
                                  {formatPrice(
                                    listPrice,
                                    offers?.priceCurrency,
                                  )}
                                </span>
                              )}

                              <span class="font-medium text-base-400">
                                {formatPrice(price, offers?.priceCurrency)}
                              </span>
                            </div>

                            {installments && (
                              <span class="font-medium text-base-400">
                                {installments.replace(".", ",")}
                              </span>
                            )}
                          </div>
                        </a>
                      </li>
                    );
                  },
                )}
              </ul>
            )
            : (
              <span class="pb-2">
                Não encontramos nenhum produto com este termo. Tente buscar por
                outro termo.
              </span>
            )}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
