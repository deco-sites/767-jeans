import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-[#616B6B] text-sm pt-5 border-t-[1px] border-gray-300">
          Informe seu CEP para verificar o prazo de entrega.
        </span>
      </div>

      <form
        class="flex items-center justify-between border max-w-60 h-12"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Resultss.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="w-full h-full focus:outline-none pl-2"
          placeholder="00000000"
          name="postalCode"
          maxLength={8}
          size={8}
        />

        <button
          type="submit"
          class="flex items-center justify-center px-4 font-medium h-full bg-black hover:bg-black/80 text-white"
        >
          <span class="[.htmx-request_&]:hidden inline">Calcular</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
