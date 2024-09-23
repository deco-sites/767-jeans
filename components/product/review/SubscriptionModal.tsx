export default function SubscriptionModal() {
  return (
    <>
      <label for="measurement-table">
        <span class="underline cursor-pointer">Ver tabelas de medidas</span>
      </label>

      <input type="checkbox" id="measurement-table" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          Avaliação
        </div>
        <label class="modal-backdrop" for="measurement-table">Close</label>
      </div>
    </>
  );
}
