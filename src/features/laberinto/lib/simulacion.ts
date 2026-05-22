import type { ConfigLaberinto, MapaLaberinto, Posicion } from "@/features/laberinto/lib/config";
import { encontrarPosiciones } from "@/features/laberinto/lib/config";

export function simularRecorrido(
  cromosoma: number[],
  mapa: MapaLaberinto,
  _config: ConfigLaberinto
): { trayectoria: Posicion[]; colisiones: number; pasosDados: number; alcanzoMeta: boolean; distanciaFinal: number } {
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
    let nexX = posActual.x;
    let neyY = posActual.y;
    if (gen === 1) nexX += 1;
    else if (gen === 2) nexX -= 1;
    else if (gen === 3) neyY += 1;
    else if (gen === 4) neyY -= 1;

    const esFuera = nexX < 0 || nexX >= ancho || neyY < 0 || neyY >= alto;
    const esPared = !esFuera && mapa[neyY][nexX] === "1";
    if (esFuera || esPared) colisiones++;
    else if (nexX !== posActual.x || neyY !== posActual.y) {
      posActual = { x: nexX, y: neyY };
      trayectoria.push({ ...posActual, geneIndex: i });
      if (mapa[posActual.y][posActual.x] === "E") {
        alcanzoMeta = true;
        break;
      }
    }
  }

  const dx = posActual.x - fin.x;
  const dy = posActual.y - fin.y;
  const distanciaFinal = Math.sqrt(dx * dx + dy * dy);
  return { trayectoria, colisiones, pasosDados, alcanzoMeta, distanciaFinal };
}
