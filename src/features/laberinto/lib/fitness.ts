import { encontrarPosiciones, type ConfigLaberinto, type MapaLaberinto } from "@/features/laberinto/lib/config";
import {
  calcularRecompensaRutaSolucion16x16,
  calcularRecompensaRutaSolucion30x30,
  esMapa16x16,
  esMapa30x30,
} from "@/features/laberinto/lib/distancia";
import type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";
import { simularRecorrido } from "@/features/laberinto/lib/simulacion";

function calcularCostoDistanciaEuclidiana(distanciaEuclidiana: number, mapa: MapaLaberinto): number {
  const filas = mapa.length;
  const columnas = mapa[0]?.length ?? 0;
  const maxDimension = Math.max(filas, columnas);

  if (maxDimension <= 12) {
    return distanciaEuclidiana;
  }

  const distanciaCuadraticaNormalizada = (distanciaEuclidiana * distanciaEuclidiana) / maxDimension;
  return distanciaCuadraticaNormalizada;
}

export function calcularFitness(
  costoDistancia: number,
  colisiones: number,
  pasosDados: number,
  alcanzoMeta: boolean,
  config: ConfigLaberinto
): number {
  const penalizacionMuroTotal = colisiones * config.penalizacionMuro;
  const penalizacionPasoTotal = pasosDados * config.penalizacionPaso;
  const recompensa = alcanzoMeta ? config.recompensaMeta : 0;
  return -1 * costoDistancia + penalizacionMuroTotal + penalizacionPasoTotal + recompensa;
}

export function evaluarPoblacion(poblacion: IndividuoLaberinto[], mapa: MapaLaberinto, config: ConfigLaberinto): IndividuoLaberinto[] {
  const posiciones = encontrarPosiciones(mapa);
  const esMapaGrande = esMapa16x16(mapa) || esMapa30x30(mapa);

  const evaluados = poblacion.map((ind) => {
    const sim = simularRecorrido(ind.cromosoma, mapa, config, posiciones);
    const costoDistancia = esMapaGrande ? 0 : calcularCostoDistanciaEuclidiana(sim.distanciaFinal, mapa);
    const recompensaRuta = esMapa16x16(mapa)
      ? calcularRecompensaRutaSolucion16x16(sim.trayectoria, config.recompensaCasilleroCorrecto)
      : esMapa30x30(mapa)
      ? calcularRecompensaRutaSolucion30x30(sim.trayectoria, config.recompensaCasilleroCorrecto)
      : 0;
    const fitness = calcularFitness(costoDistancia, sim.colisiones, sim.pasosDados, sim.alcanzoMeta, config) + recompensaRuta;

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
