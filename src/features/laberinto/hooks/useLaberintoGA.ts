import { useEffect, useRef } from "react";
import { useLaberintoVisual } from "@/features/laberinto/hooks/useLaberintoVisual";
import { useLaberintoEvolutivo } from "@/features/laberinto/hooks/useLaberintoEvolutivo";

export function useLaberintoGA() {
  const visual = useLaberintoVisual(null);
  const evolutivo = useLaberintoEvolutivo(visual.setPasoSimulacion);

  useEffect(() => {
    const max = evolutivo.mejorIndividuoGeneracion ? Math.max(0, evolutivo.mejorIndividuoGeneracion.trayectoria.length - 1) : 0;
    if (visual.pasoSimulacion > max) visual.setPasoSimulacion(max);
  }, [evolutivo.mejorIndividuoGeneracion, visual]);

  const avanzarPasoRef = useRef<(pasoActual: number) => void>(() => undefined);
  avanzarPasoRef.current = evolutivo.avanzarPasoSimulacion;

  useEffect(() => {
    if (!evolutivo.reproduciendo) return;
    const id = setInterval(() => avanzarPasoRef.current(visual.pasoSimulacion), 1000);
    return () => clearInterval(id);
  }, [evolutivo.reproduciendo, visual.pasoSimulacion]);

  const caminoDestacado = evolutivo.mejorIndividuoGeneracion
    ? evolutivo.mejorIndividuoGeneracion.trayectoria.slice(0, visual.pasoSimulacion + 1)
    : [];

  const maxPasosSimulacion = evolutivo.mejorIndividuoGeneracion
    ? Math.max(0, evolutivo.mejorIndividuoGeneracion.trayectoria.length - 1)
    : 0;

  return {
    config: evolutivo.config,
    mapaId: evolutivo.mapaId,
    setMapaId: evolutivo.setMapaId,
    poblacion: evolutivo.poblacion,
    generacion: evolutivo.generacion,
    reproduciendo: evolutivo.reproduciendo,
    setReproduciendo: evolutivo.setReproduciendo,
    pasoSimulacion: visual.pasoSimulacion,
    mejorIndividuoHistorico: evolutivo.mejorIndividuoHistorico,
    historialMejorFitness: evolutivo.historialMejorFitness,
    mapaActual: evolutivo.mapaActual,
    inicio: evolutivo.inicio,
    mejorIndividuoGeneracion: evolutivo.mejorIndividuoGeneracion,
    exitosGeneracionActual: evolutivo.exitosGeneracionActual,
    maxPasosSimulacion,
    caminoDestacado,
    reiniciarPoblacion: () => evolutivo.reiniciarPoblacionCon(evolutivo.config, evolutivo.mapaActual),
    avanzarUnaGeneracion: evolutivo.avanzarUnaGeneracion,
    avanzar50Generaciones: evolutivo.avanzar50Generaciones,
    cambiarConfiguracion: evolutivo.cambiarConfiguracion,
    cambiarAplicarOptimizacionPrefijo: evolutivo.cambiarAplicarOptimizacionPrefijo,
  };
}
