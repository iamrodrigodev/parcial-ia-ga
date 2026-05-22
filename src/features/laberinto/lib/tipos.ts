import type { Posicion } from "@/features/laberinto/lib/config";

export interface IndividuoLaberinto {
  id: number;
  cromosoma: number[];
  fitness: number;
  trayectoria: Posicion[];
  colisiones: number;
  pasosDados: number;
  pasosQuietos: number;
  alcanzoMeta: boolean;
  distanciaFinal: number;
}
