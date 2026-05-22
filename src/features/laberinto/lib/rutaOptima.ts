import type { MapaLaberinto, Posicion } from "@/features/laberinto/lib/config";

type Direccion = 1 | 2 | 3 | 4;

const rutasOptimasCache = new WeakMap<MapaLaberinto, readonly Direccion[]>();

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

function obtenerFinMapa(mapa: MapaLaberinto): Posicion {
  for (let y = 0; y < mapa.length; y++) {
    for (let x = 0; x < mapa[y].length; x++) {
      if (mapa[y][x] === "E") {
        return { x, y };
      }
    }
  }

  return { x: 0, y: 0 };
}

function reconstruirRutaOptimaDirecciones(mapa: MapaLaberinto): readonly Direccion[] {
  const inicio = obtenerInicioMapa(mapa);
  const fin = obtenerFinMapa(mapa);
  const alto = mapa.length;
  const ancho = mapa[0]?.length ?? 0;
  const visitados = new Set<string>([`${inicio.x},${inicio.y}`]);
  const cola: Array<{ posicion: Posicion; ruta: Direccion[] }> = [{ posicion: inicio, ruta: [] }];
  const movimientos: Array<{ dx: number; dy: number; dir: Direccion }> = [
    { dx: 1, dy: 0, dir: 1 },
    { dx: -1, dy: 0, dir: 2 },
    { dx: 0, dy: 1, dir: 3 },
    { dx: 0, dy: -1, dir: 4 },
  ];

  while (cola.length > 0) {
    const actual = cola.shift();
    if (!actual) {
      break;
    }

    if (actual.posicion.x === fin.x && actual.posicion.y === fin.y) {
      return actual.ruta;
    }

    for (const movimiento of movimientos) {
      const siguiente = {
        x: actual.posicion.x + movimiento.dx,
        y: actual.posicion.y + movimiento.dy,
      };

      const fueraDelMapa =
        siguiente.x < 0 ||
        siguiente.x >= ancho ||
        siguiente.y < 0 ||
        siguiente.y >= alto;
      const esPared = !fueraDelMapa && mapa[siguiente.y][siguiente.x] === "1";
      const clave = `${siguiente.x},${siguiente.y}`;

      if (fueraDelMapa || esPared || visitados.has(clave)) {
        continue;
      }

      visitados.add(clave);
      cola.push({
        posicion: siguiente,
        ruta: [...actual.ruta, movimiento.dir],
      });
    }
  }

  return [];
}

export function calcularLongitudPrefijoRutaSolucion(mapa: MapaLaberinto, cromosoma: number[]): number {
  const rutaSolucion = rutasOptimasCache.get(mapa) ?? reconstruirRutaOptimaDirecciones(mapa);
  if (!rutasOptimasCache.has(mapa)) {
    rutasOptimasCache.set(mapa, rutaSolucion);
  }

  const limite = Math.min(cromosoma.length, rutaSolucion.length);
  let prefijo = 0;

  for (let i = 0; i < limite; i++) {
    if (cromosoma[i] !== rutaSolucion[i]) {
      break;
    }
    prefijo++;
  }

  return prefijo;
}
