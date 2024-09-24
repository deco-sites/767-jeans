import AvaliationForm from "./Form.tsx";

interface Props {
  productId?: string;
  status?: "success" | "failed";
}

export default function SubscriptionModal(
  { status, productId }: Props,
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
            <AvaliationForm status={status} productId={productId} />
          </div>
        </div>
        <label class="modal-backdrop" for="aval">Close</label>
      </div>
    </>
  );
}
