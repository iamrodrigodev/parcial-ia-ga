import { Flag, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";
import { Posicion } from "@/features/laberinto/lib/config";

interface Props {
  mapaActual: string[][];
  filas: number;
  columnas: number;
  caminoDestacado: Posicion[];
  poblacion: IndividuoLaberinto[];
  pasoSimulacion: number;
  mejorIndividuoGeneracion: IndividuoLaberinto | null;
  inicio: Posicion;
  maxPasosSimulacion: number;
}

export function GridLaberinto({ mapaActual, filas, columnas, caminoDestacado, poblacion, pasoSimulacion, mejorIndividuoGeneracion, inicio, maxPasosSimulacion }: Props) {
  return (
    <div className="flex flex-col items-center bg-zinc-50 rounded-2xl border p-6 shadow-inner relative overflow-hidden">
      <div className="absolute top-2 right-3 flex items-center gap-1">
        <MapPin size={12} className="text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Dimensión: {columnas}x{filas}</span>
      </div>

      <div
        className="grid gap-0.5 border border-zinc-300 p-1.5 rounded-lg bg-zinc-200/80 shadow-md w-full relative"
        style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))`, maxWidth: `${columnas * 40}px`, aspectRatio: `${columnas} / ${filas}` }}
      >
        {mapaActual.map((fila, y) =>
          fila.map((celda, x) => {
            const esInicio = celda === "S";
            const esFin = celda === "E";
            const esPared = celda === "1";
            const esCaminoMejor = caminoDestacado.some((p) => p.x === x && p.y === y);
            const individuosEnEstaCelda = poblacion.filter((ind) => {
              const idx = Math.min(pasoSimulacion, ind.trayectoria.length - 1);
              const pos = ind.trayectoria[idx] || inicio;
              return pos.x === x && pos.y === y;
            });

            return (
              <div
                key={`celda-${x}-${y}`}
                className={`relative aspect-square flex items-center justify-center rounded-sm transition-all duration-300 ${
                  esPared
                    ? "bg-zinc-800 border border-zinc-700/80 shadow-inner"
                    : esInicio
                    ? "bg-emerald-500/10 border border-emerald-500 text-emerald-600 font-black"
                    : esFin
                    ? "bg-amber-500/10 border border-amber-500 text-amber-500 font-black animate-pulse"
                    : "bg-white border border-zinc-100"
                }`}
              >
                {esCaminoMejor && !esInicio && !esFin && (
                  <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute w-2 h-2 rounded-full bg-indigo-500/80 shadow-sm shadow-indigo-400" />
                )}
                {esInicio && <span className="text-[10px] uppercase font-bold tracking-tight">S</span>}
                {esFin && <Flag size={14} className="text-amber-500" />}

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {individuosEnEstaCelda.map((ind) => {
                    const esElMejor = ind.id === mejorIndividuoGeneracion?.id;
                    const deX = ((ind.id * 5) % 14) - 7;
                    const deY = ((ind.id * 9) % 14) - 7;
                    return (
                      <motion.div
                        key={`ind-${ind.id}`}
                        layoutId={`ind-${ind.id}`}
                        animate={{ x: deX, y: deY, scale: esElMejor ? 1.4 : 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className={`absolute w-2 h-2 rounded-full shadow-sm border ${
                          esElMejor
                            ? "bg-indigo-600 border-white ring-2 ring-indigo-400/40 z-30 shadow-indigo-500/50 scale-125"
                            : ind.alcanzoMeta
                            ? "bg-emerald-500 border-white z-20 shadow-emerald-400/40"
                            : "bg-zinc-500 border-zinc-200 z-10"
                        }`}
                        title={`Ind ${ind.id}: F=${ind.fitness.toFixed(1)}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {mejorIndividuoGeneracion && (
        <div className="w-full max-w-[450px] mt-4 flex items-center justify-between gap-3 text-xs bg-white border rounded-lg p-2.5 shadow-sm">
          <span className="font-semibold text-muted-foreground">Animación</span>
          <div className="flex-1 h-2 bg-zinc-100 rounded relative overflow-hidden">
            <div className="absolute h-full bg-indigo-600 rounded transition-all duration-300" style={{ width: `${(pasoSimulacion / maxPasosSimulacion) * 100}%` }} />
          </div>
          <span className="font-bold tabular-nums text-zinc-800">{pasoSimulacion} / {maxPasosSimulacion}</span>
        </div>
      )}
    </div>
  );
}


