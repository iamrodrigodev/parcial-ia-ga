export interface ConfigLaberinto {
  cantidadIndividuos: number;
  limitePasos: number;
  tasaMutacion: number;
  tamanoTorneo: number;
  penalizacionPaso: number;
  penalizacionMuro: number;
  recompensaMeta: number;
  recompensaCasilleroCorrecto: number;
  aplicarOptimizacionPrefijo: boolean;
}

export type CeldaLaberinto = "0" | "1" | "S" | "E";
export type MapaLaberinto = CeldaLaberinto[][];

export interface Posicion {
  x: number;
  y: number;
  geneIndex?: number;
}

export const CONFIGURACION_DEFECTO: ConfigLaberinto = {
  cantidadIndividuos: 100,
  limitePasos: 60,
  tasaMutacion: 0.15,
  tamanoTorneo: 5,
  penalizacionPaso: -1,
  penalizacionMuro: -12,
  recompensaMeta: 600,
  recompensaCasilleroCorrecto: 12,
  aplicarOptimizacionPrefijo: false,
};

function crearRngSemilla(semilla: number): () => number {
  let estado = semilla >>> 0;
  return () => {
    estado = (1664525 * estado + 1013904223) >>> 0;
    return estado / 0x100000000;
  };
}

function mezclar<T>(valores: T[], rng: () => number): T[] {
  const copia = [...valores];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function generarMapaGrande30x30(): MapaLaberinto {
  const ancho = 30;
  const alto = 30;
  const celdasLogicas = 15;
  const mapa: MapaLaberinto = Array.from({ length: alto }, () => Array.from({ length: ancho }, () => "1"));
  const visitadas = Array.from({ length: celdasLogicas }, () => Array(celdasLogicas).fill(false));
  const rng = crearRngSemilla(100100);
  const pila: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];

  const abrirCelda = (x: number, y: number): void => {
    mapa[y * 2][x * 2] = "0";
  };

  abrirCelda(0, 0);
  visitadas[0][0] = true;

  while (pila.length > 0) {
    const actual = pila[pila.length - 1];
    const vecinos = mezclar(
      [
        { x: actual.x + 1, y: actual.y },
        { x: actual.x - 1, y: actual.y },
        { x: actual.x, y: actual.y + 1 },
        { x: actual.x, y: actual.y - 1 },
      ],
      rng
    ).filter(
      (vecino) =>
        vecino.x >= 0 &&
        vecino.x < celdasLogicas &&
        vecino.y >= 0 &&
        vecino.y < celdasLogicas &&
        !visitadas[vecino.y][vecino.x]
    );

    if (vecinos.length === 0) {
      pila.pop();
      continue;
    }

    const siguiente = vecinos[0];
    visitadas[siguiente.y][siguiente.x] = true;
    abrirCelda(siguiente.x, siguiente.y);
    mapa[actual.y + siguiente.y][actual.x + siguiente.x] = "0";
    pila.push(siguiente);
  }

  mapa[0][0] = "S";
  mapa[28][28] = "E";
  return mapa;
}

export const MAPA_FACIL: MapaLaberinto = [
  ["S", "0", "0", "0", "1", "0", "0", "0"],
  ["1", "1", "1", "0", "1", "0", "1", "0"],
  ["0", "0", "0", "0", "0", "0", "1", "0"],
  ["0", "1", "1", "1", "1", "1", "1", "0"],
  ["0", "0", "0", "0", "1", "0", "0", "0"],
  ["1", "1", "1", "0", "1", "0", "1", "1"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "1", "1", "1", "1", "1", "1", "E"],
];

export const MAPA_MEDIO: MapaLaberinto = [
  ["S", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0"],
  ["1", "1", "1", "0", "1", "0", "1", "1", "1", "1", "1", "0"],
  ["0", "0", "0", "0", "1", "0", "1", "0", "0", "0", "1", "0"],
  ["0", "1", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "0", "0", "1", "1", "1", "0", "1", "0", "0", "0"],
  ["0", "1", "1", "0", "1", "0", "0", "0", "1", "1", "1", "0"],
  ["0", "0", "0", "0", "1", "0", "1", "1", "1", "0", "0", "0"],
  ["1", "1", "1", "0", "1", "0", "0", "0", "1", "0", "1", "1"],
  ["0", "0", "1", "0", "1", "1", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "1", "0", "0", "0", "1", "0", "0", "0", "1", "0"],
  ["0", "0", "0", "0", "1", "0", "1", "1", "1", "1", "1", "0"],
  ["1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "E"],
];

export const MAPA_DIFICIL: MapaLaberinto = [
  ["S", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0"],
  ["1", "0", "1", "0", "1", "1", "1", "0", "1", "0", "1", "1", "1", "1", "1", "0"],
  ["1", "0", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "0", "0", "1", "0"],
  ["1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1", "0", "1", "0", "1", "0"],
  ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "0", "0"],
  ["0", "1", "0", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "1"],
  ["0", "1", "0", "1", "0", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0", "0"],
  ["0", "1", "0", "1", "0", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "0"],
  ["0", "0", "0", "1", "0", "1", "0", "0", "1", "0", "1", "0", "1", "0", "0", "0"],
  ["1", "1", "1", "1", "0", "1", "0", "1", "1", "0", "1", "0", "1", "0", "1", "1"],
  ["0", "0", "0", "0", "0", "1", "0", "1", "0", "0", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "1", "1", "1", "1", "0", "1", "0", "1", "1", "0", "1", "0", "1", "0"],
  ["0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0"],
  ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "E"],
];

export const MAPA_GIGANTE: MapaLaberinto = generarMapaGrande30x30();

export const MAPAS_PREDEFINIDOS = [
  { id: "facil", nombre: "Laberinto FÃ¡cil (8x8)", mapa: MAPA_FACIL },
  { id: "medio", nombre: "Laberinto Medio (12x12)", mapa: MAPA_MEDIO },
  { id: "dificil", nombre: "Laberinto DifÃ­cil (16x16)", mapa: MAPA_DIFICIL },
  { id: "gigante", nombre: "Laberinto Grande (30x30)", mapa: MAPA_GIGANTE },
];

export function encontrarPosiciones(mapa: MapaLaberinto): { inicio: Posicion; fin: Posicion } {
  let inicio: Posicion = { x: 0, y: 0 };
  let fin: Posicion = { x: 0, y: 0 };

  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      if (mapa[y][x] === "S") inicio = { x, y };
      else if (mapa[y][x] === "E") fin = { x, y };
    }
  }

  return { inicio, fin };
}
