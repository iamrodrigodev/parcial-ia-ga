import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";

export function CruceDosPuntos() {
  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Cruce de Dos Puntos</TituloTarjeta>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Se eligen dos puntos de corte. El material genético que se encuentra entre ambos puntos se intercambia entre los padres.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-8 items-center mt-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Padres:</span>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-1 h-8 bg-red-500 mx-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-1 h-8 bg-red-500 mx-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-1 h-8 bg-red-500 mx-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-1 h-8 bg-red-500 mx-1 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
              </div>
            </div>
          </div>
          
          <div className="w-px h-8 bg-muted-foreground/30 hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Hijos:</span>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-1 h-8 bg-transparent mx-1"></div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white shadow-inner">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white shadow-inner">1</div>
                <div className="w-1 h-8 bg-transparent mx-1"></div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-1 h-8 bg-transparent mx-1"></div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white shadow-inner">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white shadow-inner">1</div>
                <div className="w-1 h-8 bg-transparent mx-1"></div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
              </div>
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
