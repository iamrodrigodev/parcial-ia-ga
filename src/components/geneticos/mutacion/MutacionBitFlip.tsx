import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";

export function MutacionBitFlip() {
  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación Bit Flip (Volteo de Bits)</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">
          Típicamente usado en codificación binaria. Se invierte el valor de uno o más genes elegidos al azar (los 0s se vuelven 1s y viceversa).
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-6 items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Antes:</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">1</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">0</div>
              <div className="w-10 h-10 border-2 border-red-500 bg-red-50 text-red-700 flex items-center justify-center font-bold text-lg rounded shadow-sm shadow-red-200">0</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">1</div>
            </div>
          </div>
          
          <div className="w-px h-8 bg-muted-foreground/30 hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Después:</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">1</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">0</div>
              <div className="w-10 h-10 border-2 border-green-500 bg-green-50 text-green-700 flex items-center justify-center font-bold text-lg rounded shadow-sm shadow-green-200">1</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold text-lg rounded shadow-sm">1</div>
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
