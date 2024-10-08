import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: {
    source: ImageWidget;
    width?: number;
    height?: number;
  };

  /** @description mobile otimized image */
  mobile: {
    source: ImageWidget;
    width?: number;
    height?: number;
  };

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  /**
   * @description If this option is active, the image takes up half the screen
   */
  hasContainerClass?: boolean;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative block overflow-hidden w-full"
    >
      {action && action.title && (
        <div
          class={clx(
            "absolute h-full w-full top-0 left-0",
            "flex flex-col justify-center items-center",
            "px-5 sm:px-0",
            "sm:left-40 sm:items-start sm:max-w-96",
          )}
        >
          {action.title && (
            <span class="text-7xl font-bold text-base-100">
              {action.title}
            </span>
          )}

          {action.subTitle && (
            <span class="font-normal text-base text-base-100 pt-4 pb-12">
              {action.subTitle}
            </span>
          )}

          {action.label && (
            <button
              class="btn btn-primary btn-outline border-0 bg-base-100 min-w-[180px]"
              aria-label={action.label}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.source}
          width={mobile.width || 767}
          height={mobile.height || 510}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.source}
          width={desktop.width || 1280}
          height={desktop.height || 664}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.source}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel(
  { images = [], preload, interval, hasContainerClass = false }: Props,
) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] min-h-[510px]",
        "sm:grid-cols-[112px_1fr_112px] md:min-h-full",
        "w-full",
        hasContainerClass && "container max-w-site",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {images.length > 1 && (
        <>
          <div class="hidden sm:flex items-center justify-center z-10 col-start-1 row-start-2">
            <Slider.PrevButton
              class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
              disabled={false}
            >
              <Icon id="chevron-right" class="rotate-180" />
            </Slider.PrevButton>
          </div>

          <div class="hidden sm:flex items-center justify-center z-10 col-start-3 row-start-2">
            <Slider.NextButton
              class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
              disabled={false}
            >
              <Icon id="chevron-right" />
            </Slider.NextButton>
          </div>

          <ul
            class={clx(
              "col-span-full row-start-4 z-10",
              "carousel justify-center gap-3",
            )}
          >
            {images.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot
                  index={index}
                  class={clx(
                    "bg-black opacity-20 h-3 w-3 no-animation rounded-full",
                    "disabled:w-8 disabled:bg-black/50 disabled:opacity-100 transition-[width]",
                  )}
                >
                </Slider.Dot>
              </li>
            ))}
          </ul>

          <Slider.JS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </>
      )}
    </div>
  );
}

export default Carousel;
