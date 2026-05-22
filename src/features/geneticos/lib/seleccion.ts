import { Individuo } from "@/features/geneticos/lib/tipos";

export interface ResultadoRuleta {
  ganador: Individuo;
  numeroAleatorio: number;
  nuevaRotacion: number;
}

export function ejecutarSeleccionRuleta(
  individuos: Individuo[],
  rotacionActual: number
): ResultadoRuleta {
  const fitnessTotal = individuos.reduce((acc, ind) => acc + ind.fitness, 0);
  const rand = Math.floor(Math.random() * fitnessTotal) + 1;

  let acumulado = 0;
  let winner = individuos[0];
  for (const ind of individuos) {
    acumulado += ind.fitness;
    if (rand <= acumulado) {
      winner = ind;
      break;
    }
  }

  const centroPct = (winner.pctInicio + winner.pctFin) / 2;
  const centroDeg = centroPct * 3.6;
  const nuevaRotacion = rotacionActual + (1800 - (rotacionActual % 360)) + (360 - centroDeg);

  return {
    ganador: winner,
    numeroAleatorio: rand,
    nuevaRotacion,
  };
}

export interface ResultadoRanking extends ResultadoRuleta {
  individuosRankeados: (Individuo & { ranking: number; prob: number; pctInicioRank: number; pctFinRank: number })[];
}

export function ejecutarSeleccionRanking(
  individuos: Individuo[],
  rotacionActual: number
): ResultadoRanking {
  const ordenados = [...individuos].sort((a, b) => a.fitness - b.fitness);
  const N = ordenados.length;
  const sumaRangos = (N * (N + 1)) / 2;

  let pctAcumulado = 0;
  const rankeados = ordenados.map((ind, index) => {
    const ranking = index + 1;
    const prob = (ranking / sumaRangos) * 100;
    const res = {
      ...ind,
      ranking,
      prob,
      pctInicioRank: pctAcumulado,
      pctFinRank: pctAcumulado + prob,
    };
    pctAcumulado += prob;
    return res;
  });

  const rand = Math.floor(Math.random() * 100) + 1;
  let winner = rankeados[0];
  for (const ind of rankeados) {
    if (rand <= ind.pctFinRank) {
      winner = ind;
      break;
    }
  }

  const centroPct = (winner.pctInicioRank + winner.pctFinRank) / 2;
  const centroDeg = centroPct * 3.6;
  const nuevaRotacion = rotacionActual + (1800 - (rotacionActual % 360)) + (360 - centroDeg);

  return {
    ganador: winner,
    numeroAleatorio: rand,
    nuevaRotacion,
    individuosRankeados: rankeados,
  };
}

export interface ResultadoTorneo {
  concursantes: Individuo[];
  campeon: Individuo;
}

export function ejecutarSeleccionTorneo(individuos: Individuo[], k: number): ResultadoTorneo {
  const mezclados = [...individuos].sort(() => 0.5 - Math.random());
  const concursantes = mezclados.slice(0, k);
  const campeon = [...concursantes].sort((a, b) => b.fitness - a.fitness)[0];
  return { concursantes, campeon };
}

export interface ResultadoSteadyState {
  peoresIds: number[];
  mejoresIds: number[];
}

export function ejecutarEstadoEquilibrio(
  individuos: Individuo[],
  nReemplazo: number = 1
): ResultadoSteadyState {
  const ordenados = [...individuos].sort((a, b) => b.fitness - a.fitness);
  const mejoresIds = ordenados.slice(0, nReemplazo).map((i) => i.id);
  const peoresIds = ordenados.slice(-nReemplazo).map((i) => i.id);
  return { mejoresIds, peoresIds };
}

export interface ResultadoElitismo {
  eliteIds: number[];
  restoIds: number[];
}

export function ejecutarElitismo(individuos: Individuo[], nElite: number = 2): ResultadoElitismo {
  const ordenados = [...individuos].sort((a, b) => b.fitness - a.fitness);
  const eliteIds = ordenados.slice(0, nElite).map((i) => i.id);
  const restoIds = ordenados.slice(nElite).map((i) => i.id);
  return { eliteIds, restoIds };
}
