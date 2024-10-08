import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  description?: HTMLWidget;

  images: {
    mobile: {
      source: ImageWidget;
      width?: number;
      height?: number;
    };
    desktop: {
      source: ImageWidget;
      width?: number;
      height?: number;
    };
  };

  href: string;
  cta?: {
    label?: string;
  };
}

function Banner({ title, description, images, href, cta }: Props) {
  return (
    <Section.Container>
      <div class="relative bg-base-200 mx-5 sm:mx-0">
        <a href={href}>
          <Picture>
            <Source
              media="(max-width: 640px)"
              src={images.mobile.source}
              width={images.mobile.width || 335}
              height={images.mobile.height || 572}
            />
            <Source
              media="(min-width: 640px)"
              src={images.desktop.source}
              width={images.desktop.width || 1320}
              height={images.desktop.height || 480}
            />
            <img
              src={images.desktop.source}
              alt={title}
              class="w-full object-cover"
            />
          </Picture>
        </a>

        {title || cta?.label && (
              <div
                class={clx(
                  "absolute left-0 top-0",
                  "p-5 sm:p-10 md:py-20 md:px-[60px]",
                  "flex flex-col",
                  "h-full max-w-full sm:max-w-[33%] md:max-w-[50%] justify-center",
                )}
              >
                {title && (
                  <span class="font-bold text-7xl text-primary">{title}</span>
                )}

                {description && (
                  <span
                    class="font-normal text-sm md: pt-4 pb-12"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {cta && (
                  <div>
                    <a
                      href={href}
                      class="btn btn-primary no-animatio w-fit border-0 min-w-[180px]"
                    >
                      {cta.label}
                    </a>
                  </div>
                )}
              </div>
            )}
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
