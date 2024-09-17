import { MeasurementTable } from "./MeasurementTable.tsx";

export default function MeasurementModal() {
  return (
    <>
      <label for="measurement-table">
        <span class="underline cursor-pointer">Ver tabelas de medidas</span>
      </label>

      <input type="checkbox" id="measurement-table" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <MeasurementTable />
        </div>
        <label class="modal-backdrop" for="measurement-table">Close</label>
      </div>
    </>
  );
}
