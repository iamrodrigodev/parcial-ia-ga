import { ChevronRight, FastForward } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Insignia } from "@/components/ui/insignia";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";

interface Props {
  generacion: number;
  mejorIndividuoGeneracion: IndividuoLaberinto | null;
  reproduciendo: boolean;
  avanzarUnaGeneracion: () => void;
  avanzar50Generaciones: () => void;
}

export function BarraControlLaberinto({
  generacion,
  mejorIndividuoGeneracion,
  reproduciendo,
  avanzarUnaGeneracion,
  avanzar50Generaciones,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 border p-3.5 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Generación</span>
          <span className="text-2xl font-black tabular-nums text-zinc-950">{generacion}</span>
        </div>
        <div className="h-8 w-px bg-zinc-200" />
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Mejor Fitness</span>
          <span className="text-2xl font-black tabular-nums text-zinc-950">
            {mejorIndividuoGeneracion ? mejorIndividuoGeneracion.fitness.toFixed(1) : "-"}
          </span>
        </div>
        <div className="h-8 w-px bg-zinc-200" />
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Resuelto</span>
          <span className="flex items-center mt-1">
            {mejorIndividuoGeneracion?.alcanzoMeta ? (
              <Insignia className="bg-emerald-100 text-emerald-800 font-bold border-transparent px-2.5 py-0.5 text-xs">
                ¡Éxito!
              </Insignia>
            ) : reproduciendo ? (
              <Insignia className="bg-zinc-200 text-zinc-700 font-bold border-transparent px-2.5 py-0.5 text-xs animate-pulse">
                Resolviendo...
              </Insignia>
            ) : (
              <Insignia className="bg-zinc-100 text-zinc-500 font-bold border-transparent px-2.5 py-0.5 text-xs">
                Pendiente
              </Insignia>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Boton
          variante="primario"
          icono={ChevronRight}
          onClick={avanzarUnaGeneracion}
          disabled={reproduciendo}
          className="h-9 text-xs"
          title="Avanzar exactamente 1 generación inmediatamente"
        >
          <span>+1 Gen</span>
        </Boton>
        <Boton
          variante="primario"
          icono={FastForward}
          onClick={avanzar50Generaciones}
          disabled={reproduciendo}
          className="h-9 text-xs"
          title="Avanzar 50 generaciones inmediatamente en segundo plano"
        >
          <span>+50 Gens</span>
        </Boton>
      </div>
    </div>
  );
}


