import { MeasurementTable } from "./MeasurementTable.tsx";

export default function MeasurementModal({ size }: { size: string }) {
  return (
    <>
      <label for="measurement-table">
        <span class="underline cursor-pointer">Ver tabelas de medidas</span>
      </label>

      <input type="checkbox" id="measurement-table" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <MeasurementTable size={size} />
        </div>
        <label class="modal-backdrop" for="measurement-table">Close</label>
      </div>
    </>
  );
}
