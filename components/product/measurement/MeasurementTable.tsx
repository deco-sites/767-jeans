import { shortConstants, tShirtsContants } from "./constants.ts";

export function MeasurementTable({ size }: { size: string }) {
  const isNumeric = !isNaN(Number(size));

  return (
    <div class="flex flex-col items-center justify-center w-full gap-4">
      <h2 class="text-xl text-center font-medium uppercase">
        Compare as medidas com esta tabela.
      </h2>

      {isNumeric ? <ShortTable /> : <TShirtTable />}
    </div>
  );
}

function ShortTable() {
  return (
    <table class="border-collapse w-full">
      <thead>
        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold bg-[#f5f5f5]">
          <th class="min-w-[84px] text-sm h-11">Tamanho</th>
          <th class="min-w-[84px] text-sm h-11">Cintura</th>
          <th class="min-w-[84px] text-sm h-11">Quadril</th>
        </tr>
      </thead>

      <tbody>
        {shortConstants.map((item, index) => (
          <tr
            key={index}
            className="h-11 text-[#4b4b4b] text-center uppercase font-medium odd:bg-white even:bg-[#f5f5f5]"
          >
            <td class="min-w-[84px] text-sm h-11">{item.size}</td>
            <td class="min-w-[84px] text-sm h-11">{item.range1}</td>
            <td class="min-w-[84px] text-sm h-11">{item.range2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TShirtTable() {
  return (
    <table class="border-collapse w-full">
      <thead>
        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold bg-[#f5f5f5]">
          <th class="min-w-[84px] text-sm h-11">Tamanho</th>
          <th class="min-w-[84px] text-sm h-11">Cintura</th>
          <th class="min-w-[84px] text-sm h-11">Quadril</th>
        </tr>
      </thead>

      <tbody>
        {tShirtsContants.map((item, index) => (
          <tr
            key={index}
            className="h-11 text-[#4b4b4b] text-center uppercase font-medium odd:bg-white even:bg-[#f5f5f5]"
          >
            <td class="min-w-[84px] text-sm h-11">{item.size}</td>
            <td class="min-w-[84px] text-sm h-11">{item.range1}</td>
            <td class="min-w-[84px] text-sm h-11">{item.range2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
