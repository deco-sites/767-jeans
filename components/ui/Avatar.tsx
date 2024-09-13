import { clx } from "../../sdk/clx.ts";

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */
interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const colors: Record<string, Record<string, string>> = {
  "off-white": { backgroundColor: "#e3e0e1" },
  "lilas": { backgroundColor: "#c8a2c8" },
  "jeans": { backgroundColor: "#9ab9d8" },
  "branco": { backgroundColor: "#FFFFFF" },
  "cinza": { backgroundColor: "#808080" },
  "terracota": { backgroundColor: "#e06c60" },
  "bege": { backgroundColor: "#d1ae97" },
  "rosa-claro": { backgroundColor: "#db97c3" },
  "prata": { backgroundColor: "#cccfd6" },
  "laranja": { backgroundColor: "#FFA500" },
  "marrom": { backgroundColor: "#A52A2A" },
  "preto": { backgroundColor: "#161616" },
  "verde": { backgroundColor: "#94b69d" },
  "verde-militar": { backgroundColor: "#514743" },
  "verde-menta": { backgroundColor: "#19b2ac" },
  "verde-claro": { backgroundColor: "#9dc6cf" },
  "vermelho": { backgroundColor: "#FF0000" },
};

const variants = {
  active: "ring-base-content",
  disabled: "line-through",
  default: "ring-base-400",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder">
      <div
        class={clx(
          "h-6 w-6",
          "rounded-full",
          "ring-1 ring-offset-2",
          variants[variant],
        )}
        style={colors[content]}
      >
        <span class="uppercase">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
