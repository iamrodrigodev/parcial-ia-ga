import type { ConfigLaberinto, MapaLaberinto } from "@/features/laberinto/lib/config";
import type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";
import { simularRecorrido } from "@/features/laberinto/lib/simulacion";

export function calcularFitness(
  distanciaFinal: number,
  colisiones: number,
  pasosDados: number,
  alcanzoMeta: boolean,
  config: ConfigLaberinto
): number {
  const penalizacionMuroTotal = colisiones * config.penalizacionMuro;
  const penalizacionPasoTotal = pasosDados * config.penalizacionPaso;
  const recompensa = alcanzoMeta ? config.recompensaMeta : 0;
  return -1 * distanciaFinal + penalizacionMuroTotal + penalizacionPasoTotal + recompensa;
}

export function evaluarPoblacion(poblacion: IndividuoLaberinto[], mapa: MapaLaberinto, config: ConfigLaberinto): IndividuoLaberinto[] {
  const evaluados = poblacion.map((ind) => {
    const sim = simularRecorrido(ind.cromosoma, mapa, config);
    const fitness = calcularFitness(sim.distanciaFinal, sim.colisiones, sim.pasosDados, sim.alcanzoMeta, config);
    return {
      ...ind,
      fitness,
      trayectoria: sim.trayectoria,
      colisiones: sim.colisiones,
      pasosDados: sim.pasosDados,
      pasosQuietos: sim.pasosQuietos,
      alcanzoMeta: sim.alcanzoMeta,
      distanciaFinal: sim.distanciaFinal,
    };
  });
  return evaluados.sort((a, b) => b.fitness - a.fitness);
}
