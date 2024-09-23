import { SectionProps } from "@deco/deco";
import { AppContext } from "../../../apps/deco/vtex.ts";
import { useComponent } from "../../../sections/Component.tsx";

export type Status = "success" | "failed" | undefined;

interface InputProps {
  id: string;
  labelName: string;
}

interface Props {
  productId?: string;
  status?: Status;
}

async function action(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<{ status?: Status }> {
  const user = window.STOREFRONT.USER.getUser();

  if (!user) {
    return {
      status: "failed",
    };
  }

  const form = await req.formData();
  const title = `${form.get("title") ?? ""}`;
  const reviewerName = `${form.get("name") ?? ""}`;
  const text = `${form.get("review") ?? ""}`;
  const rating = `${form.get("rating") ?? ""}`;

  const review = await ctx.invoke.vtex.actions.review.submit({
    data: {
      productId: props.productId || "",
      title,
      rating: Number(rating) || 5,
      reviewerName,
      text,
      approved: false,
    },
  });

  if (!review) {
    return {
      ...props,
      status: "failed",
    };
  }

  return {
    status: "success",
  };
}

export default function AvaliationForm(
  { productId, status }: Props & SectionProps<typeof action>,
) {
  return (
    <form
      hx-sync="this:replace"
      hx-swap="outerHTML"
      hx-target="this"
      hx-post={useComponent(import.meta.url, { productId, status: "success" })}
      class="w-full"
    >
      {!status && (
        <div class="flex flex-col gap-3 w-full">
          <h2 class="font-bold text-lg">Adicionar avaliação</h2>

          <AvaliationInput id="title" labelName="Avaliação" />
          <AvaliationRating
            id="rating"
            labelName="Avalie o produto de 1 até 5 estrelas"
          />
          <AvaliationInput id="name" labelName="Seu nome" />
          <AvaliationTextArea id="review" labelName="Escrever avaliação" />

          <button
            type="submit"
            class="flex items-center justify-center w-full xl:w-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md mt-1 transition duration-150 ease-in-out"
          >
            <span class="[.htmx-request_&]:hidden inline">
              Enviar avaliação
            </span>

            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </div>
      )}

      {status === "success" && (
        <span>
          {"Obrigado por avaliar o nosso produto. Iremos aprovar a sua avaliação logo mais :)"}
        </span>
      )}

      {status === "failed" && (
        <span>Algo deu errado. Por favor, tente novamente.</span>
      )}
    </form>
  );
}

function AvaliationInput({ id, labelName }: InputProps) {
  return (
    <div class="flex flex-col w-full gap-1">
      <label for={id}>{labelName}</label>

      <input
        name={id}
        type="text"
        required
        class="px-1 py-1.5 border border-black/30 rounded-sm focus:select-none text-sm"
      />
    </div>
  );
}

function AvaliationRating({ id, labelName }: InputProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div class="flex flex-col w-full gap-1">
      <label for={id}>{labelName}</label>

      <div class="rating rating-sm">
        {stars.map((_, idx) => (
          <input
            value={idx + 1}
            checked={idx === 5}
            type="radio"
            name="rating"
            class="mask mask-star-2 bg-orange-400"
          />
        ))}
      </div>
    </div>
  );
}

function AvaliationTextArea({ id, labelName }: InputProps) {
  return (
    <div class="flex flex-col w-full gap-1">
      <label for={id}>{labelName}</label>

      <textarea
        name={id}
        type="text"
        required
        class="px-1 py-1.5 border border-black/30 rounded-sm focus:select-none text-sm resize-none"
      />
    </div>
  );
}
