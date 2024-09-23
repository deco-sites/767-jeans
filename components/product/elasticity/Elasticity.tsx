import { clx } from "../../../sdk/clx.ts";

interface OptionProps {
  name: string;
  isSelected?: boolean;
}

export interface Props {
  elasticityValue?: string;
}

const options: Pick<OptionProps, "name">[] = [
  { name: "Comfort" },
  { name: "Elástico" },
  { name: "Super Elástico" },
  { name: "Hiper Elástico" },
  { name: "Always Fits" },
];

export default function Elasticity({ elasticityValue }: Props) {
  if (!elasticityValue) return null;

  return (
    <div class="grid grid-cols-5 items-center max-w-3xl">
      {options.map(({ name }) => (
        <Option name={name} isSelected={name === elasticityValue} />
      ))}
    </div>
  );
}

function Option({ name, isSelected = false }: OptionProps) {
  return (
    <div class="flex flex-col gap-2 items-center justify-center w-full">
      <div
        class={clx(
          "h-5 w-full border border-[#A89B95]",
          isSelected && "bg-[#A89B95]",
        )}
      />

      <span
        class={`text-[11px] tracking-tighter text-center sm:text-base min-h-[33px] ${
          isSelected ? "font-bold" : "font-medium"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
