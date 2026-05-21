import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";

export function MutacionIntercambio() {
  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación por Intercambio</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">
          Se seleccionan dos posiciones al azar en el cromosoma y se intercambian sus valores. Muy común en problemas de permutación como el TSP (Viajante de Comercio).
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col gap-8 items-center mt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold">Antes:</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">A</div>
              <div className="w-10 h-10 border-2 border-blue-500 bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg rounded shadow-sm">B</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">C</div>
              <div className="w-10 h-10 border-2 border-amber-500 bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg rounded shadow-sm">D</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">E</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 justify-center h-8 relative w-full max-w-[240px]">
             {/* Simple crossover arrows */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 32" preserveAspectRatio="none">
               <path d="M 68,0 C 68,16 164,16 164,32" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-blue)" />
               <path d="M 164,0 C 164,16 68,16 68,32" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-amber)" />
               <defs>
                 <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                 </marker>
                 <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                 </marker>
               </defs>
             </svg>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold">Después:</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">A</div>
              <div className="w-10 h-10 border-2 border-amber-500 bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg rounded shadow-sm">D</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">C</div>
              <div className="w-10 h-10 border-2 border-blue-500 bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg rounded shadow-sm">B</div>
              <div className="w-10 h-10 border-2 bg-white flex items-center justify-center font-bold rounded shadow-sm text-muted-foreground">E</div>
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
