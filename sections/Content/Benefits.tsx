import { useId } from "../../sdk/useId.ts";
import Section from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
interface Benefit {
  image: {
    source: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  };
  title: string;
  subtitle: string;
}
export interface Props {
  /**
   * @maxItems 04
   */
  benefits: Benefit[];
}
export default function Benefits({ benefits }: Props) {
  if (!benefits || benefits.length === 0) {
    return null;
  }
  const device = useDevice();
  const isDesktop = device === "desktop";
  return (
    <Section.Container class="!py-4">
      {!isDesktop
        ? <SliderBenefits benefits={benefits} />
        : <DesktopBenefits benefits={benefits} />}
    </Section.Container>
  );
}
function Benefit({ image, title, subtitle }: Benefit) {
  return (
    <div class="flex flex-col sm:flex-row items-center justify-center gap-2 w-full h-full">
      <Image
        src={image.source}
        alt={image.description}
        width={image.width || 50}
        height={image.height || 50}
        loading="lazy"
      />

      <div class="flex flex-col w-full justify-center sm:justify-start text-center sm:text-start">
        <span class="font-medium text-sm">{title}</span>
        <span class="text-xs">{subtitle}</span>
      </div>
    </div>
  );
}
function DesktopBenefits({ benefits }: Props) {
  return (
    <ul class="flex items-center justify-between w-full h-full gap-4">
      {benefits.map((benefit) => (
        <li class="w-full h-full">
          <Benefit {...benefit} />
        </li>
      ))}
    </ul>
  );
}
function SliderBenefits({ benefits }: Props) {
  const id = useId();
  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-full gap-6">
        {benefits.map((benefit, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-24 sm:w-[28%] h-full"
          >
            <Benefit {...benefit} />
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}
