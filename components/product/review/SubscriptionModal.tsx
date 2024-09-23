import AvaliationForm from "./Form.tsx";

interface Props {
  productId?: string;
}

export default function SubscriptionModal(
  { productId }: Props,
) {
  return (
    <>
      <label for="aval">
        <span class="underline cursor-pointer">Escrever avaliação</span>
      </label>

      <input type="checkbox" id="aval" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <div class="w-full">
            <AvaliationForm productId={productId} />
          </div>
        </div>
        <label class="modal-backdrop" for="aval">Close</label>
      </div>
    </>
  );
}
