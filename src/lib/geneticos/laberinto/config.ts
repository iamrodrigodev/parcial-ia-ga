export interface ConfigLaberinto {
  cantidadIndividuos: number; // Population size
  limitePasos: number;        // Max moves/genes (N)
  tasaMutacion: number;       // Mutation rate (0.0 to 1.0)
  tamanoTorneo: number;       // Tournament size
  penalizacionPaso: number;   // Cost per step (negative)
  penalizacionMuro: number;   // Cost per wall collision (negative)
  recompensaMeta: number;     // Goal reward (positive)
}

export type CeldaLaberinto = '0' | '1' | 'S' | 'E';
export type MapaLaberinto = CeldaLaberinto[][];

export interface Posicion {
  x: number; // Column index
  y: number; // Row index
  geneIndex?: number; // Optional gene index that led here
}

// Default configuration parameters
export const CONFIGURACION_DEFECTO: ConfigLaberinto = {
  cantidadIndividuos: 100,
  limitePasos: 60,
  tasaMutacion: 0.15,
  tamanoTorneo: 5,
  penalizacionPaso: -1,
  penalizacionMuro: -12,
  recompensaMeta: 600,
};

// 1. Easy Map (8x8): Straightforward paths with minor turns
export const MAPA_FACIL: MapaLaberinto = [
  ['S', '0', '0', '0', '1', '0', '0', '0'],
  ['1', '1', '1', '0', '1', '0', '1', '0'],
  ['0', '0', '0', '0', '0', '0', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '0'],
  ['0', '0', '0', '0', '1', '0', '0', '0'],
  ['1', '1', '1', '0', '1', '0', '1', '1'],
  ['0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '1', '1', '1', '1', '1', '1', 'E'],
];

// 2. Medium Map (12x12): Multiple paths with some dead ends and a winding main corridor
export const MAPA_MEDIO: MapaLaberinto = [
  ['S', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0'],
  ['1', '1', '1', '0', '1', '0', '1', '1', '1', '1', '1', '0'],
  ['0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '1', '0'],
  ['0', '1', '1', '0', '0', '0', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '0', '0', '1', '1', '1', '0', '1', '0', '0', '0'],
  ['0', '1', '1', '0', '1', '0', '0', '0', '1', '1', '1', '0'],
  ['0', '0', '0', '0', '1', '0', '1', '1', '1', '0', '0', '0'],
  ['1', '1', '1', '0', '1', '0', '0', '0', '1', '0', '1', '1'],
  ['0', '0', '1', '0', '1', '1', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0'],
  ['0', '0', '0', '0', '1', '0', '1', '1', '1', '1', '1', '0'],
  ['1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', 'E'],
];

// 3. Hard Map (16x16): A complex maze with many blocks and a long, singular correct path
export const MAPA_DIFICIL: MapaLaberinto = [
  ['S', '0', '1', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0'],
  ['1', '0', '1', '0', '1', '1', '1', '0', '1', '0', '1', '1', '1', '1', '1', '0'],
  ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '1', '0', '0', '0', '1', '0'],
  ['1', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '0', '1', '0', '1', '0'],
  ['0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0'],
  ['0', '1', '0', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1'],
  ['0', '1', '0', '1', '0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '0'],
  ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '1', '0'],
  ['0', '0', '0', '1', '0', '1', '0', '0', '1', '0', '1', '0', '1', '0', '0', '0'],
  ['1', '1', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1'],
  ['0', '0', '0', '0', '0', '1', '0', '1', '0', '0', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0'],
  ['0', '1', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', 'E'],
];

export const MAPAS_PREDEFINIDOS = [
  { id: 'facil', nombre: 'Laberinto Fácil (8x8)', mapa: MAPA_FACIL },
  { id: 'medio', nombre: 'Laberinto Medio (12x12)', mapa: MAPA_MEDIO },
  { id: 'dificil', nombre: 'Laberinto Difícil (16x16)', mapa: MAPA_DIFICIL },
];

/**
 * Finds the starting ('S') and ending ('E') positions in a given maze map.
 */
export function encontrarPosiciones(mapa: MapaLaberinto): { inicio: Posicion; fin: Posicion } {
  let inicio: Posicion = { x: 0, y: 0 };
  let fin: Posicion = { x: 0, y: 0 };

  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      if (mapa[y][x] === 'S') {
        inicio = { x, y };
      } else if (mapa[y][x] === 'E') {
        fin = { x, y };
      }
    }
  }

  return { inicio, fin };
}
