import type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";

export function generarGenAleatorio(): number {
  return Math.floor(Math.random() * 5);
}

export function crearIndividuoAleatorio(id: number, limitePasos: number): IndividuoLaberinto {
  const cromosoma: number[] = Array.from({ length: limitePasos }, () => generarGenAleatorio());
  return {
    id,
    cromosoma,
    fitness: -Infinity,
    trayectoria: [],
    colisiones: 0,
    pasosDados: 0,
    pasosQuietos: 0,
    alcanzoMeta: false,
    distanciaFinal: Infinity,
  };
}
