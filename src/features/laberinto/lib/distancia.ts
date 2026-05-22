import { MAPA_DIFICIL, MAPA_GIGANTE, type MapaLaberinto, type Posicion } from "@/features/laberinto/lib/config";
import { obtenerRutaOptimaPosiciones } from "@/features/laberinto/lib/rutaOptima";

export const SECUENCIA_SOLUCION_16X16: readonly number[] = [
  1, 3, 3, 1, 1, 4, 4, 1, 1, 1, 1, 3, 3, 2, 2, 3,
  3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 4, 4, 1, 1, 4, 4, 4, 4, 1,
  1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4,
  4, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2,
  3, 3, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 3,
  3, 2, 2, 3, 3, 3, 3, 1, 1, 3,
];

type Direccion = 1 | 2 | 3 | 4;

const MOVIMIENTOS: Record<Direccion, { dx: number; dy: number }> = {
  1: { dx: 1, dy: 0 },
  2: { dx: -1, dy: 0 },
  3: { dx: 0, dy: 1 },
  4: { dx: 0, dy: -1 },
};

export function esMapa16x16(mapa: MapaLaberinto): boolean {
  return mapa.length === 16 && mapa.every((fila) => fila.length === 16);
}

export function esMapa30x30(mapa: MapaLaberinto): boolean {
  return mapa.length === 30 && mapa.every((fila) => fila.length === 30);
}

function obtenerInicioMapa(mapa: MapaLaberinto): Posicion {
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      if (mapa[y][x] === "S") {
        return { x, y };
      }
    }
  }

  return { x: 0, y: 0 };
}

function construirRutaSolucion16x16(mapa: MapaLaberinto): Posicion[] {
  const ruta: Posicion[] = [];
  const visitados = new Set<string>();
  const inicio = obtenerInicioMapa(mapa);
  let posicionActual = { ...inicio };

  const registrar = (posicion: Posicion): void => {
    const clave = `${posicion.x},${posicion.y}`;
    if (visitados.has(clave)) {
      return;
    }
    visitados.add(clave);
    ruta.push({ ...posicion });
  };

  for (const paso of SECUENCIA_SOLUCION_16X16) {
    const movimiento = MOVIMIENTOS[paso as Direccion];
    if (!movimiento) {
      break;
    }

    const siguiente = {
      x: posicionActual.x + movimiento.dx,
      y: posicionActual.y + movimiento.dy,
    };

    const fueraDelMapa =
      siguiente.x < 0 ||
      siguiente.x >= mapa[0].length ||
      siguiente.y < 0 ||
      siguiente.y >= mapa.length;
    const esPared = !fueraDelMapa && mapa[siguiente.y][siguiente.x] === "1";

    if (fueraDelMapa || esPared) {
      break;
    }

    posicionActual = siguiente;
    registrar(posicionActual);
    if (mapa[posicionActual.y][posicionActual.x] === "E") {
      break;
    }
  }

  return ruta;
}

export const CASILLEROS_SOLUCION_16X16 = new Set(
  construirRutaSolucion16x16(MAPA_DIFICIL).map((posicion) => `${posicion.x},${posicion.y}`)
);

export const CASILLEROS_SOLUCION_30X30 = new Set(
  obtenerRutaOptimaPosiciones(MAPA_GIGANTE).map((posicion) => `${posicion.x},${posicion.y}`)
);

function calcularRecompensaCasilleros(trayectoria: Posicion[], recompensaPorCasillero: number, casillerosCorrectos: Set<string>): number {
  const visitados = new Set<string>();
  let recompensa = 0;

  for (const posicion of trayectoria) {
    if (posicion.geneIndex === -1) {
      continue;
    }

    const clave = `${posicion.x},${posicion.y}`;
    if (!casillerosCorrectos.has(clave) || visitados.has(clave)) {
      continue;
    }

    visitados.add(clave);
    recompensa += recompensaPorCasillero;
  }

  return recompensa;
}

export function calcularRecompensaRutaSolucion16x16(trayectoria: Posicion[], recompensaPorCasillero: number): number {
  return calcularRecompensaCasilleros(trayectoria, recompensaPorCasillero, CASILLEROS_SOLUCION_16X16);
}

export function calcularRecompensaRutaSolucion30x30(trayectoria: Posicion[], recompensaPorCasillero: number): number {
  return calcularRecompensaCasilleros(trayectoria, recompensaPorCasillero, CASILLEROS_SOLUCION_30X30);
}
