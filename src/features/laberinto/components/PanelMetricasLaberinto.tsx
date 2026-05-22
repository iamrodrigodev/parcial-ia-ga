import { memo } from "react";
import { Award } from "lucide-react";
import { Tarjeta, ContenidoTarjeta } from "@/components/ui/tarjeta";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";

interface Props {
  mejorIndividuoHistorico: IndividuoLaberinto | null;
}

function PanelMetricasLaberintoBase({ mejorIndividuoHistorico }: Props) {
  if (!mejorIndividuoHistorico) return null;

  return (
    <Tarjeta className="bg-zinc-50 border">
      <ContenidoTarjeta className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <Award size={14} className="text-amber-500" />
            Mejor Fitness Histórico
          </span>
          <span className="text-sm font-extrabold text-amber-600">{mejorIndividuoHistorico.fitness.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <span className="text-xs font-semibold text-muted-foreground">Colisiones / Pasos dados / Quietos</span>
          <span className="text-xs font-bold">
            {mejorIndividuoHistorico.colisiones} choc. / {mejorIndividuoHistorico.pasosDados} pas. / {mejorIndividuoHistorico.pasosQuietos} quietos
          </span>
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <span className="text-xs font-semibold text-muted-foreground">Distancia Euclidiana final</span>
          <span className="text-xs font-bold text-zinc-800">{mejorIndividuoHistorico.distanciaFinal.toFixed(2)} casillas</span>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}

export const PanelMetricasLaberinto = memo(PanelMetricasLaberintoBase);
