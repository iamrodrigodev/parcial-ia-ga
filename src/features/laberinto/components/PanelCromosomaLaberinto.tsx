import { Target } from "lucide-react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";

interface Props {
  mejorIndividuoGeneracion: IndividuoLaberinto | null;
  pasoSimulacion: number;
  obtenerIconoMovimiento: (gen: number) => string;
  colorPorGen: (gen: number) => string;
}

export function PanelCromosomaLaberinto({ mejorIndividuoGeneracion, pasoSimulacion, obtenerIconoMovimiento, colorPorGen }: Props) {
  if (!mejorIndividuoGeneracion) return null;

  return (
    <Tarjeta className="border shadow-sm">
      <EncabezadoTarjeta className="py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-indigo-600" />
            <TituloTarjeta className="text-base font-bold">Cromosoma del Mejor Individuo Actual</TituloTarjeta>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-150">
            Aptitud: {mejorIndividuoGeneracion.fitness.toFixed(1)}
          </span>
        </div>
        <DescripcionTarjeta className="text-xs mt-1">
          Muestra la secuencia de genes del individuo más apto de esta generación.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta className="pb-4 pt-0">
        <div className="flex flex-wrap gap-1 bg-zinc-50 p-3 rounded-lg border max-h-[140px] overflow-y-auto">
          {mejorIndividuoGeneracion.cromosoma.map((gen, idx) => {
            const activeGeneIndex = mejorIndividuoGeneracion.trayectoria[pasoSimulacion]?.geneIndex ?? -1;
            const esPasoActivo = idx <= activeGeneIndex;
            return (
              <span
                key={`gen-${idx}`}
                className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded border transition-all duration-300 shadow-sm ${colorPorGen(gen)} ${
                  esPasoActivo ? "ring-2 ring-indigo-500 ring-offset-1 scale-105 z-10" : "opacity-70"
                }`}
                title={`Gen ${idx}: Valor ${gen} (${obtenerIconoMovimiento(gen)})`}
              >
                {obtenerIconoMovimiento(gen)}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[11px] font-semibold text-zinc-500">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-zinc-150 border inline-block" /><span>• Quedarse quieto</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-100 border inline-block" /><span>→ Derecha</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purple-100 border inline-block" /><span>← Izquierda</span></div>
          <div className="flex items-center gap-1.5"><div className="flex gap-0.5"><span className="w-2.5 h-2.5 rounded bg-emerald-100 border inline-block" /><span className="w-2.5 h-2.5 rounded bg-rose-100 border inline-block" /></div><span>↓ Abajo / ↑ Arriba</span></div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}


