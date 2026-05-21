import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";

export function MutacionInversion() {
  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación por Inversión</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">
          Se elige un subconjunto continuo de genes y se invierte su orden completamente.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col gap-6 items-center mt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold">Antes:</span>
            <div className="flex gap-1 relative">
              <div className="absolute top-0 bottom-0 left-[3rem] right-[3rem] -inset-y-2 border-2 border-dashed border-red-400 bg-red-50/30 rounded z-0"></div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded z-10 text-muted-foreground">1</div>
              <div className="w-10 h-10 border-2 border-red-500 bg-red-100 text-red-900 flex items-center justify-center font-bold rounded z-10">2</div>
              <div className="w-10 h-10 border-2 border-red-500 bg-red-100 text-red-900 flex items-center justify-center font-bold rounded z-10">3</div>
              <div className="w-10 h-10 border-2 border-red-500 bg-red-100 text-red-900 flex items-center justify-center font-bold rounded z-10">4</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded z-10 text-muted-foreground">5</div>
            </div>
            <span className="text-xs text-red-500 font-bold mt-1">Subconjunto a invertir</span>
          </div>
          
          <div className="w-px h-6 bg-muted-foreground/30"></div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold">Después:</span>
            <div className="flex gap-1">
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded text-muted-foreground">1</div>
              <div className="w-10 h-10 border-2 border-green-500 bg-green-100 text-green-900 flex items-center justify-center font-bold rounded">4</div>
              <div className="w-10 h-10 border-2 border-green-500 bg-green-100 text-green-900 flex items-center justify-center font-bold rounded">3</div>
              <div className="w-10 h-10 border-2 border-green-500 bg-green-100 text-green-900 flex items-center justify-center font-bold rounded">2</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded text-muted-foreground">5</div>
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
