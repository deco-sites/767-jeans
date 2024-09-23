interface InputProps {
  id: string;
  labelName: string;
}

export default function SubscriptionModal() {
  return (
    <>
      <label for="aval">
        <span class="underline cursor-pointer">Escrever avaliação</span>
      </label>

      <input type="checkbox" id="aval" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <Avaliation />
        </div>
        <label class="modal-backdrop" for="aval">Close</label>
      </div>
    </>
  );
}

function Avaliation() {
  return (
    <form class="flex flex-col gap-3 w-full">
      <h2 class="font-bold text-lg">Adicionar avaliação</h2>

      <AvaliationInput id="avaliation" labelName="Avaliação" />
      <AvaliationInput id="name" labelName="Seu nome" />

      <button
        type="submit"
        class="flex items-center justify-center w-full xl:w-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md mt-1 transition duration-150 ease-in-out"
      >
        Enviar avaliação
      </button>
    </form>
  );
}

function AvaliationInput({ id, labelName }: InputProps) {
  return (
    <div class="flex flex-col w-full gap-0.5">
      <label for={id}>{labelName}</label>

      <input
        type="text"
        required
        class="p-1 border border-black/30 rounded-sm focus:select-none text-sm"
      />
    </div>
  );
}
