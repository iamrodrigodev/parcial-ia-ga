import type { Posicion } from "@/features/laberinto/lib/config";

export interface IndividuoLaberinto {
  id: number;
  cromosoma: number[];
  fitness: number;
  trayectoria: Posicion[];
  colisiones: number;
  pasosDados: number;
  alcanzoMeta: boolean;
  distanciaFinal: number;
}
