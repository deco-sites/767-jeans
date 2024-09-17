export function MeasurementTable() {
  return (
    <div class="flex flex-col items-center justify-center w-full gap-4">
      <h2 class="text-xl font-medium uppercase">
        Compare as medidas com esta tabela
      </h2>

      <ShortTable />
    </div>
  );
}

export function ShortTable() {
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
        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">34</td>
          <td class="min-w-[84px] text-sm h-11">60 - 62</td>
          <td class="min-w-[84px] text-sm h-11">86 - 88</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">36</td>
          <td class="min-w-[84px] text-sm h-11">64 - 67</td>
          <td class="min-w-[84px] text-sm h-11">90 - 93</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">38</td>
          <td class="min-w-[84px] text-sm h-11">68 - 72</td>
          <td class="min-w-[84px] text-sm h-11">94 - 98</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">40</td>
          <td class="min-w-[84px] text-sm h-11">73 - 77</td>
          <td class="min-w-[84px] text-sm h-11">99 - 103</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">42</td>
          <td class="min-w-[84px] text-sm h-11">78 - 82</td>
          <td class="min-w-[84px] text-sm h-11">104 - 108</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">44</td>
          <td class="min-w-[84px] text-sm h-11">83 - 86</td>
          <td class="min-w-[84px] text-sm h-11">109 - 113</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">46</td>
          <td class="min-w-[84px] text-sm h-11">87 - 91</td>
          <td class="min-w-[84px] text-sm h-11">114 - 118</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">48</td>
          <td class="min-w-[84px] text-sm h-11">91 - 96</td>
          <td class="min-w-[84px] text-sm h-11">119 - 123</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">50</td>
          <td class="min-w-[84px] text-sm h-11">95 - 101</td>
          <td class="min-w-[84px] text-sm h-11">124 - 128</td>
        </tr>

        <tr class="h-11 text-[#4b4b4b] text-center uppercase font-semibold">
          <td class="min-w-[84px] text-sm h-11">52</td>
          <td class="min-w-[84px] text-sm h-11">99 - 106</td>
          <td class="min-w-[84px] text-sm h-11">129 - 133</td>
        </tr>
      </tbody>
    </table>
  );
}
