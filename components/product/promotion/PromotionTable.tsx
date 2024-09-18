const constants = [
  { quantity: 2, offer: "10% off" },
  { quantity: 3, offer: "15% off" },
  { quantity: 4, offer: "20% off" },
];

export default function PromotionTable() {
  return (
    <table class="border-collapse">
      <thead>
        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold bg-[#f5f5f5]">
          <th class="min-w-[84px] text-sm h-11">Leve</th>
          <th class="min-w-[84px] text-sm h-11">Ganhe</th>
        </tr>
      </thead>

      <tbody>
        {constants.map((item, index) => (
          <tr
            key={index}
            className="h-11 text-[#4b4b4b] text-center uppercase font-medium odd:bg-white even:bg-[#f5f5f5]"
          >
            <td class="min-w-[84px] text-sm h-11">{item.quantity}</td>
            <td class="min-w-[84px] text-sm h-11">{item.offer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
