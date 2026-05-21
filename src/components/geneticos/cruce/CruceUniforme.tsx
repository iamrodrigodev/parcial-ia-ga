import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";

export function CruceUniforme() {
  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Cruce Uniforme</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Altamente destructivo</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          En lugar de cortar el cromosoma, para cada gen se "lanza una moneda" para decidir de qué padre heredará el hijo.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-8 items-center mt-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Padres:</span>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
              </div>
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
                <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
            <span className="w-20 text-sm font-bold text-center md:text-right text-muted-foreground">Moneda:</span>
            <div className="flex gap-1">
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-blue-600">P1</div>
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-blue-600">P1</div>
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-green-600">P2</div>
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-blue-600">P1</div>
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-green-600">P2</div>
              <div className="w-8 h-6 flex items-center justify-center text-xs font-bold text-green-600">P2</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="w-20 text-sm font-bold text-center md:text-right">Hijo:</span>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">1</div>
              <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
              <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
              <div className="w-8 h-8 bg-blue-500 border border-border flex items-center justify-center text-white">0</div>
              <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">0</div>
              <div className="w-8 h-8 bg-green-500 border border-border flex items-center justify-center text-white">1</div>
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
