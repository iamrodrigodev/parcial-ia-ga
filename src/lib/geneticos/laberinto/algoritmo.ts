import { ConfigLaberinto, MapaLaberinto, Posicion, encontrarPosiciones } from './config';

export interface IndividuoLaberinto {
  id: number;
  cromosoma: number[];
  fitness: number;
  trayectoria: Posicion[]; // The sequence of positions from start to final
  colisiones: number;
  pasosDados: number;
  alcanzoMeta: boolean;
  distanciaFinal: number;
}

/**
 * Generates a random gene between 0 and 4.
 * 0: Stay still
 * 1: Right (X + 1)
 * 2: Left (X - 1)
 * 3: Down (Y + 1)
 * 4: Up (Y - 1)
 */
export function generarGenAleatorio(): number {
  return Math.floor(Math.random() * 5);
}

/**
 * Creates a new random individual.
 */
export function crearIndividuoAleatorio(id: number, limitePasos: number): IndividuoLaberinto {
  const cromosoma: number[] = Array.from({ length: limitePasos }, () => generarGenAleatorio());
  return {
    id,
    cromosoma,
    fitness: -Infinity,
    trayectoria: [],
    colisiones: 0,
    pasosDados: 0,
    alcanzoMeta: false,
    distanciaFinal: Infinity,
  };
}

/**
 * Simulates the trajectory of a chromosome in the maze.
 */
export function simularRecorrido(
  cromosoma: number[],
  mapa: MapaLaberinto,
  config: ConfigLaberinto
): {
  trayectoria: Posicion[];
  colisiones: number;
  pasosDados: number;
  alcanzoMeta: boolean;
  distanciaFinal: number;
} {
  const { inicio, fin } = encontrarPosiciones(mapa);
  const alto = mapa.length;
  const ancho = mapa[0].length;

  const trayectoria: Posicion[] = [{ ...inicio, geneIndex: -1 }];
  let colisiones = 0;
  let pasosDados = 0;
  let alcanzoMeta = false;

  let posActual = { ...inicio };

  for (let i = 0; i < cromosoma.length; i++) {
    pasosDados++;
    const gen = cromosoma[i];

    // Compute planned next position
    let nexX = posActual.x;
    let neyY = posActual.y;

    if (gen === 1) nexX += 1;      // Right
    else if (gen === 2) nexX -= 1; // Left
    else if (gen === 3) neyY += 1; // Down
    else if (gen === 4) neyY -= 1; // Up
    // gen === 0 is stay still (nexX = posActual.x, neyY = posActual.y)

    // Check boundaries and walls
    const esFuera = nexX < 0 || nexX >= ancho || neyY < 0 || neyY >= alto;
    const esPared = !esFuera && mapa[neyY][nexX] === '1';

    if (esFuera || esPared) {
      // Apply collision penalty, individual stays in current cell
      colisiones++;
      // Do NOT push to trayectoria. A wall collision doesn't advance position.
    } else {
      // Only push to trajectory if it is an actual movement to a different cell
      if (nexX !== posActual.x || neyY !== posActual.y) {
        posActual = { x: nexX, y: neyY };
        trayectoria.push({ ...posActual, geneIndex: i });

        // Check if reached goal
        if (mapa[posActual.y][posActual.x] === 'E') {
          alcanzoMeta = true;
          break; // Stop immediately as per requirements
        }
      }
    }
  }

  // Calculate Euclidean Distance
  const dx = posActual.x - fin.x;
  const dy = posActual.y - fin.y;
  const distanciaFinal = Math.sqrt(dx * dx + dy * dy);

  return {
    trayectoria,
    colisiones,
    pasosDados,
    alcanzoMeta,
    distanciaFinal,
  };
}

/**
 * Calculates fitness according to the requested formula:
 * Fitness = (-1 * DistanciaEuclidiana) + TotalPenalizacionesPorMuro + TotalPenalizacionesPorPaso + RecompensaMeta
 */
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

  return (-1 * distanciaFinal) + penalizacionMuroTotal + penalizacionPasoTotal + recompensa;
}

/**
 * Evaluates the full population and returns sorted individuals (best fitness first).
 */
export function evaluarPoblacion(
  poblacion: IndividuoLaberinto[],
  mapa: MapaLaberinto,
  config: ConfigLaberinto
): IndividuoLaberinto[] {
  const evaluados = poblacion.map((ind) => {
    const sim = simularRecorrido(ind.cromosoma, mapa, config);
    const fitness = calcularFitness(
      sim.distanciaFinal,
      sim.colisiones,
      sim.pasosDados,
      sim.alcanzoMeta,
      config
    );

    return {
      ...ind,
      fitness,
      trayectoria: sim.trayectoria,
      colisiones: sim.colisiones,
      pasosDados: sim.pasosDados,
      alcanzoMeta: sim.alcanzoMeta,
      distanciaFinal: sim.distanciaFinal,
    };
  });

  // Sort descending: highest fitness first (real numbers logic: b.fitness - a.fitness)
  return evaluados.sort((a, b) => b.fitness - a.fitness);
}

/**
 * Tournament Selection: Selects a group of 'tamanoTorneo' at random and returns the best one.
 */
export function seleccionTorneo(
  poblacion: IndividuoLaberinto[],
  tamanoTorneo: number
): IndividuoLaberinto {
  const concursantes: IndividuoLaberinto[] = [];
  const n = poblacion.length;

  for (let i = 0; i < tamanoTorneo; i++) {
    const indiceAzar = Math.floor(Math.random() * n);
    concursantes.push(poblacion[indiceAzar]);
  }

  // The champion is the one with the highest algebraic fitness
  let campeon = concursantes[0];
  for (let i = 1; i < concursantes.length; i++) {
    if (concursantes[i].fitness > campeon.fitness) {
      campeon = concursantes[i];
    }
  }

  return campeon;
}

/**
 * Single-Point Crossover: Combines Father A's prefix with Father B's suffix at a random cut point.
 */
export function crossoverUnPunto(padreA: number[], padreB: number[]): number[] {
  const len = padreA.length;
  if (len <= 1) return [...padreA];

  // Select a random cut point between 1 and length - 1
  const puntoCorte = Math.floor(Math.random() * (len - 1)) + 1;

  const hijo = [
    ...padreA.slice(0, puntoCorte),
    ...padreB.slice(puntoCorte),
  ];

  return hijo;
}

/**
 * Cyclic Mutation (Set arithmetic): If a gene is selected to mutate,
 * it adds 1 modulo 5 (since the finite set is {0, 1, 2, 3, 4}).
 * newGene = (currentGene + 1) % 5.
 */
export function mutacionCiclica(cromosoma: number[], tasaMutacion: number): number[] {
  return cromosoma.map((gen) => {
    if (Math.random() < tasaMutacion) {
      return (gen + 1) % 5;
    }
    return gen;
  });
}

/**
 * Evolves the population to the next generation, preserving elite individuals.
 */
export function generarSiguienteGeneracion(
  poblacionEvaluada: IndividuoLaberinto[],
  mapa: MapaLaberinto,
  config: ConfigLaberinto
): IndividuoLaberinto[] {
  const tamañoPoblacion = config.cantidadIndividuos;
  const longitudCromosoma = config.limitePasos;
  const siguientePoblacion: IndividuoLaberinto[] = [];

  let idContador = 1;

  // 1. Elitism: Keep the top 2 best individuals unchanged to guarantee convergence
  const eliteCount = Math.min(2, tamañoPoblacion);
  for (let i = 0; i < eliteCount; i++) {
    const elite = poblacionEvaluada[i];
    siguientePoblacion.push({
      id: idContador++,
      cromosoma: [...elite.cromosoma],
      fitness: elite.fitness,
      trayectoria: [...elite.trayectoria],
      colisiones: elite.colisiones,
      pasosDados: elite.pasosDados,
      alcanzoMeta: elite.alcanzoMeta,
      distanciaFinal: elite.distanciaFinal,
    });
  }

  // 2. Crossover and Mutation to fill the rest of the population
  while (siguientePoblacion.length < tamañoPoblacion) {
    const padreA = seleccionTorneo(poblacionEvaluada, config.tamanoTorneo);
    const padreB = seleccionTorneo(poblacionEvaluada, config.tamanoTorneo);

    let hijoCromosoma = crossoverUnPunto(padreA.cromosoma, padreB.cromosoma);
    hijoCromosoma = mutacionCiclica(hijoCromosoma, config.tasaMutacion);

    siguientePoblacion.push({
      id: idContador++,
      cromosoma: hijoCromosoma,
      fitness: -Infinity,
      trayectoria: [],
      colisiones: 0,
      pasosDados: 0,
      alcanzoMeta: false,
      distanciaFinal: Infinity,
    });
  }

  // Evaluate the newly generated population so its state is fully resolved
  return evaluarPoblacion(siguientePoblacion, mapa, config);
}
