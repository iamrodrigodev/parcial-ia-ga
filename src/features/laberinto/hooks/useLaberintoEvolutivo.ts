import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigLaberinto, CONFIGURACION_DEFECTO, MAPAS_PREDEFINIDOS, MapaLaberinto, encontrarPosiciones } from "@/features/laberinto/lib/config";
import { IndividuoLaberinto, crearIndividuoAleatorio, evaluarPoblacion, generarSiguienteGeneracion } from "@/features/laberinto/lib/algoritmo";

export function useLaberintoEvolutivo(setPasoSimulacion: (n: number) => void) {
  const [config, setConfig] = useState<ConfigLaberinto>({ ...CONFIGURACION_DEFECTO });
  const [mapaId, setMapaId] = useState("medio");
  const [poblacion, setPoblacion] = useState<IndividuoLaberinto[]>([]);
  const [generacion, setGeneracion] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [mejorIndividuoHistorico, setMejorIndividuoHistorico] = useState<IndividuoLaberinto | null>(null);
  const [historialMejorFitness, setHistorialMejorFitness] = useState<{ gen: number; fitness: number }[]>([]);
  const [configAplicada, setConfigAplicada] = useState({ cantidadIndividuos: CONFIGURACION_DEFECTO.cantidadIndividuos, limitePasos: CONFIGURACION_DEFECTO.limitePasos });

  const mapaActual = useMemo(() => MAPAS_PREDEFINIDOS.find((m) => m.id === mapaId)?.mapa ?? MAPAS_PREDEFINIDOS[0].mapa, [mapaId]);
  const { inicio } = useMemo(() => encontrarPosiciones(mapaActual), [mapaActual]);
  const mejorIndividuoGeneracion = useMemo(() => (poblacion.length ? poblacion[0] : null), [poblacion]);
  const exitosGeneracionActual = useMemo(() => poblacion.filter((ind) => ind.alcanzoMeta).length, [poblacion]);

  const crearPoblacionEvaluada = useCallback((cfg: ConfigLaberinto, mapa: MapaLaberinto) => {
    const nueva = Array.from({ length: cfg.cantidadIndividuos }, (_, i) => crearIndividuoAleatorio(i + 1, cfg.limitePasos));
    return evaluarPoblacion(nueva, mapa, cfg);
  }, []);

  const reiniciarPoblacionCon = useCallback((cfg: ConfigLaberinto, mapa: MapaLaberinto) => {
    setReproduciendo(false);
    const evaluada = crearPoblacionEvaluada(cfg, mapa);
    setPoblacion(evaluada);
    setGeneracion(1);
    setPasoSimulacion(0);
    setMejorIndividuoHistorico(evaluada[0]);
    setHistorialMejorFitness([{ gen: 1, fitness: evaluada[0].fitness }]);
  }, [crearPoblacionEvaluada, setPasoSimulacion]);

  useEffect(() => {
    reiniciarPoblacionCon(config, mapaActual);
    setConfigAplicada({ cantidadIndividuos: config.cantidadIndividuos, limitePasos: config.limitePasos });
  }, [mapaId, mapaActual, reiniciarPoblacionCon]);

  useEffect(() => {
    if (configAplicada.cantidadIndividuos === config.cantidadIndividuos && configAplicada.limitePasos === config.limitePasos) return;
    const timeout = setTimeout(() => {
      reiniciarPoblacionCon(config, mapaActual);
      setConfigAplicada({ cantidadIndividuos: config.cantidadIndividuos, limitePasos: config.limitePasos });
    }, 300);
    return () => clearTimeout(timeout);
  }, [config.cantidadIndividuos, config.limitePasos, config, configAplicada, mapaActual, reiniciarPoblacionCon]);

  useEffect(() => {
    if (mejorIndividuoGeneracion && (!mejorIndividuoHistorico || mejorIndividuoGeneracion.fitness > mejorIndividuoHistorico.fitness)) {
      setMejorIndividuoHistorico(mejorIndividuoGeneracion);
    }
  }, [mejorIndividuoGeneracion, mejorIndividuoHistorico]);

  const avanzarPasoSimulacion = useCallback((pasoActual: number) => {
    const maxPasosSimulacion = mejorIndividuoGeneracion ? Math.max(0, mejorIndividuoGeneracion.trayectoria.length - 1) : 0;
    if (pasoActual < maxPasosSimulacion) {
      setPasoSimulacion(pasoActual + 1);
      return;
    }
    const siguiente = generarSiguienteGeneracion(poblacion, mapaActual, config);
    setPoblacion(siguiente);
    setGeneracion((g) => g + 1);
    setPasoSimulacion(0);
    setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguiente[0].fitness }]);
  }, [config, generacion, mapaActual, mejorIndividuoGeneracion, poblacion, setPasoSimulacion]);

  const avanzarUnaGeneracion = useCallback(() => {
    setReproduciendo(false);
    const siguiente = generarSiguienteGeneracion(poblacion, mapaActual, config);
    setPoblacion(siguiente);
    setGeneracion((g) => g + 1);
    setPasoSimulacion(Math.max(0, siguiente[0].trayectoria.length - 1));
    setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguiente[0].fitness }]);
  }, [config, generacion, mapaActual, poblacion, setPasoSimulacion]);

  const avanzar50Generaciones = useCallback(() => {
    setReproduciendo(false);
    let tempPob = [...poblacion];
    let progreso = 0;
    const nuevosRegistros: { gen: number; fitness: number }[] = [];
    const procesar = () => {
      const lote = Math.min(5, 50 - progreso);
      for (let i = 0; i < lote; i++) {
        tempPob = generarSiguienteGeneracion(tempPob, mapaActual, config);
        nuevosRegistros.push({ gen: generacion + progreso + i + 1, fitness: tempPob[0].fitness });
      }
      progreso += lote;
      setPoblacion([...tempPob]);
      setGeneracion(generacion + progreso);
      setPasoSimulacion(Math.max(0, tempPob[0].trayectoria.length - 1));
      if (progreso < 50) setTimeout(procesar, 0);
      else setHistorialMejorFitness((h) => [...h.slice(-30), ...nuevosRegistros].slice(-30));
    };
    procesar();
  }, [config, generacion, mapaActual, poblacion, setPasoSimulacion]);

  const cambiarConfiguracion = useCallback((campo: keyof ConfigLaberinto, valor: number) => {
    setReproduciendo(false);
    setPasoSimulacion(0);
    const siguiente = { ...config, [campo]: valor };
    if (campo === "cantidadIndividuos") siguiente.tamanoTorneo = Math.min(siguiente.tamanoTorneo, valor);
    if (campo === "limitePasos") siguiente.limitePasos = Math.max(5, Math.min(150, valor));
    if (campo === "tamanoTorneo") siguiente.tamanoTorneo = Math.min(valor, siguiente.cantidadIndividuos);
    setConfig(siguiente);
    if (campo === "penalizacionPaso" || campo === "penalizacionMuro" || campo === "recompensaMeta" || campo === "recompensaCasilleroCorrecto") {
      const reevaluada = evaluarPoblacion(poblacion, mapaActual, siguiente);
      setPoblacion(reevaluada);
      setMejorIndividuoHistorico(reevaluada[0]);
      setHistorialMejorFitness([{ gen: generacion, fitness: reevaluada[0].fitness }]);
    }
  }, [config, generacion, mapaActual, poblacion, setPasoSimulacion]);

  const cambiarAplicarOptimizacionPrefijo = useCallback((valor: boolean) => {
    setConfig((actual) => ({ ...actual, aplicarOptimizacionPrefijo: valor }));
  }, []);

  return { config, mapaId, setMapaId, mapaActual, inicio, poblacion, generacion, reproduciendo, setReproduciendo, mejorIndividuoHistorico, historialMejorFitness, mejorIndividuoGeneracion, exitosGeneracionActual, reiniciarPoblacionCon, avanzarPasoSimulacion, avanzarUnaGeneracion, avanzar50Generaciones, cambiarConfiguracion, cambiarAplicarOptimizacionPrefijo };
}
