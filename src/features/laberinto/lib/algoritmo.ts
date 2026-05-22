import type { ConfigLaberinto, MapaLaberinto } from "@/features/laberinto/lib/config";
import type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";
import { seleccionTorneo } from "@/features/laberinto/lib/seleccion";
import { crossoverUnPunto } from "@/features/laberinto/lib/cruce";
import { mutacionAleatoria } from "@/features/laberinto/lib/mutacion";
import { evaluarPoblacion } from "@/features/laberinto/lib/fitness";
import { calcularLongitudPrefijoRutaSolucion } from "@/features/laberinto/lib/rutaOptima";

export { crearIndividuoAleatorio, generarGenAleatorio } from "@/features/laberinto/lib/agentes";
export { simularRecorrido } from "@/features/laberinto/lib/simulacion";
export { calcularFitness, evaluarPoblacion } from "@/features/laberinto/lib/fitness";
export type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";

export function generarSiguienteGeneracion(
  poblacionEvaluada: IndividuoLaberinto[],
  mapa: MapaLaberinto,
  config: ConfigLaberinto
): IndividuoLaberinto[] {
  const tamanoPoblacion = config.cantidadIndividuos;
  const siguientePoblacion: IndividuoLaberinto[] = [];
  let idContador = 1;

  const eliteCount = Math.min(2, tamanoPoblacion);
  for (let i = 0; i < eliteCount; i++) {
    const elite = poblacionEvaluada[i];
    siguientePoblacion.push({
      id: idContador++,
      cromosoma: [...elite.cromosoma],
      fitness: elite.fitness,
      trayectoria: [...elite.trayectoria],
      colisiones: elite.colisiones,
      pasosDados: elite.pasosDados,
      pasosQuietos: elite.pasosQuietos,
      alcanzoMeta: elite.alcanzoMeta,
      distanciaFinal: elite.distanciaFinal,
    });
  }

  while (siguientePoblacion.length < tamanoPoblacion) {
    const padreA = seleccionTorneo(poblacionEvaluada, config.tamanoTorneo);
    const padreB = seleccionTorneo(poblacionEvaluada, config.tamanoTorneo);
    let hijoCromosoma = crossoverUnPunto(padreA.cromosoma, padreB.cromosoma);
    const prefijoProtegido = config.aplicarOptimizacionPrefijo
      ? calcularLongitudPrefijoRutaSolucion(mapa, hijoCromosoma)
      : 0;
    hijoCromosoma = mutacionAleatoria(hijoCromosoma, config.tasaMutacion, prefijoProtegido);

    siguientePoblacion.push({
      id: idContador++,
      cromosoma: hijoCromosoma,
      fitness: -Infinity,
      trayectoria: [],
      colisiones: 0,
      pasosDados: 0,
      pasosQuietos: 0,
      alcanzoMeta: false,
      distanciaFinal: Infinity,
    });
  }

  return evaluarPoblacion(siguientePoblacion, mapa, config);
}
