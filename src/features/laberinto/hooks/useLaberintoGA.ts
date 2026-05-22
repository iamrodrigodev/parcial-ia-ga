import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfigLaberinto, CONFIGURACION_DEFECTO, MAPAS_PREDEFINIDOS, MapaLaberinto, encontrarPosiciones } from "@/features/laberinto/lib/config";
import { IndividuoLaberinto, crearIndividuoAleatorio, evaluarPoblacion, generarSiguienteGeneracion } from "@/features/laberinto/lib/algoritmo";

export function useLaberintoGA() {
  const [config, setConfig] = useState<ConfigLaberinto>({ ...CONFIGURACION_DEFECTO });
  const [mapaId, setMapaId] = useState("medio");
  const [poblacion, setPoblacion] = useState<IndividuoLaberinto[]>([]);
  const [generacion, setGeneracion] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [pasoSimulacion, setPasoSimulacion] = useState(0);
  const [mejorIndividuoHistorico, setMejorIndividuoHistorico] = useState<IndividuoLaberinto | null>(null);
  const [historialMejorFitness, setHistorialMejorFitness] = useState<{ gen: number; fitness: number }[]>([]);

  const mapaActual = useMemo(() => {
    const seleccionado = MAPAS_PREDEFINIDOS.find((m) => m.id === mapaId);
    return seleccionado ? seleccionado.mapa : MAPAS_PREDEFINIDOS[0].mapa;
  }, [mapaId]);

  const { inicio } = useMemo(() => encontrarPosiciones(mapaActual), [mapaActual]);

  const mejorIndividuoGeneracion = useMemo(() => (poblacion.length ? poblacion[0] : null), [poblacion]);
  const exitosGeneracionActual = useMemo(() => poblacion.filter((ind) => ind.alcanzoMeta).length, [poblacion]);
  const maxPasosSimulacion = useMemo(() => (mejorIndividuoGeneracion ? mejorIndividuoGeneracion.trayectoria.length - 1 : 0), [mejorIndividuoGeneracion]);
  const caminoDestacado = useMemo(
    () => (mejorIndividuoGeneracion ? mejorIndividuoGeneracion.trayectoria.slice(0, pasoSimulacion + 1) : []),
    [mejorIndividuoGeneracion, pasoSimulacion]
  );

  const crearPoblacionEvaluada = useCallback((configAplicada: ConfigLaberinto, mapaAplicado: MapaLaberinto) => {
    const nuevaPob: IndividuoLaberinto[] = [];
    for (let i = 1; i <= configAplicada.cantidadIndividuos; i++) nuevaPob.push(crearIndividuoAleatorio(i, configAplicada.limitePasos));
    return evaluarPoblacion(nuevaPob, mapaAplicado, configAplicada);
  }, []);

  const reiniciarPoblacionCon = useCallback((configAplicada: ConfigLaberinto, mapaAplicado: MapaLaberinto) => {
    setReproduciendo(false);
    const evaluada = crearPoblacionEvaluada(configAplicada, mapaAplicado);
    setPoblacion(evaluada);
    setGeneracion(1);
    setPasoSimulacion(0);
    setMejorIndividuoHistorico(evaluada[0]);
    setHistorialMejorFitness([{ gen: 1, fitness: evaluada[0].fitness }]);
  }, [crearPoblacionEvaluada]);

  useEffect(() => {
    reiniciarPoblacionCon(config, mapaActual);
  }, [mapaId, config.cantidadIndividuos, config.limitePasos, reiniciarPoblacionCon, mapaActual]);

  useEffect(() => {
    if (mejorIndividuoGeneracion && (!mejorIndividuoHistorico || mejorIndividuoGeneracion.fitness > mejorIndividuoHistorico.fitness)) {
      setMejorIndividuoHistorico(mejorIndividuoGeneracion);
    }
  }, [mejorIndividuoGeneracion, mejorIndividuoHistorico]);

  const avanzarPasoSimulacion = useCallback(() => {
    if (pasoSimulacion < maxPasosSimulacion) {
      setPasoSimulacion((p) => p + 1);
      return;
    }
    const siguientePob = generarSiguienteGeneracion(poblacion, mapaActual, config);
    setPoblacion(siguientePob);
    setGeneracion((g) => g + 1);
    setPasoSimulacion(0);
    setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguientePob[0].fitness }]);
  }, [pasoSimulacion, maxPasosSimulacion, poblacion, mapaActual, config, generacion]);

  const avanzarPasoSimulacionRef = useRef(avanzarPasoSimulacion);
  useEffect(() => {
    avanzarPasoSimulacionRef.current = avanzarPasoSimulacion;
  }, [avanzarPasoSimulacion]);

  useEffect(() => {
    if (!reproduciendo) return;
    const intervalo = setInterval(() => avanzarPasoSimulacionRef.current(), 1000);
    return () => clearInterval(intervalo);
  }, [reproduciendo]);

  const avanzarUnaGeneracion = useCallback(() => {
    setReproduciendo(false);
    const siguientePob = generarSiguienteGeneracion(poblacion, mapaActual, config);
    setPoblacion(siguientePob);
    setGeneracion((g) => g + 1);
    setPasoSimulacion(siguientePob[0].trayectoria.length - 1);
    setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguientePob[0].fitness }]);
  }, [poblacion, mapaActual, config, generacion]);

  const avanzar50Generaciones = useCallback(() => {
    setReproduciendo(false);
    let tempPob = [...poblacion];
    const nuevosRegistros: { gen: number; fitness: number }[] = [];
    for (let i = 0; i < 50; i++) {
      tempPob = generarSiguienteGeneracion(tempPob, mapaActual, config);
      nuevosRegistros.push({ gen: generacion + i + 1, fitness: tempPob[0].fitness });
    }
    setPoblacion(tempPob);
    setGeneracion((g) => g + 50);
    setPasoSimulacion(tempPob[0].trayectoria.length - 1);
    setHistorialMejorFitness((h) => [...h.slice(-30), ...nuevosRegistros].slice(-30));
  }, [poblacion, mapaActual, config, generacion]);

  const cambiarConfiguracion = useCallback((campo: keyof ConfigLaberinto, valor: number) => {
    setReproduciendo(false);
    setPasoSimulacion(0);

    const siguiente = { ...config, [campo]: valor };

    if (campo === "cantidadIndividuos") {
      siguiente.tamanoTorneo = Math.min(siguiente.tamanoTorneo, valor);
    }

    if (campo === "limitePasos") {
      siguiente.limitePasos = Math.max(5, Math.min(150, valor));
    }

    if (campo === "tamanoTorneo") {
      siguiente.tamanoTorneo = Math.min(valor, siguiente.cantidadIndividuos);
    }

    setConfig(siguiente);

    if (campo === "penalizacionPaso" || campo === "penalizacionMuro" || campo === "recompensaMeta") {
      if (poblacion.length > 0) {
        const reevaluada = evaluarPoblacion(poblacion, mapaActual, siguiente);
        setPoblacion(reevaluada);
        setMejorIndividuoHistorico(reevaluada[0]);
        setHistorialMejorFitness([{ gen: generacion, fitness: reevaluada[0].fitness }]);
      }
    }
  }, [config, generacion, mapaActual, poblacion]);

  const reiniciarPoblacion = useCallback(() => {
    reiniciarPoblacionCon(config, mapaActual);
  }, [config, mapaActual, reiniciarPoblacionCon]);

  return {
    config,
    mapaId,
    setMapaId,
    poblacion,
    generacion,
    reproduciendo,
    setReproduciendo,
    pasoSimulacion,
    mejorIndividuoHistorico,
    historialMejorFitness,
    mapaActual,
    inicio,
    mejorIndividuoGeneracion,
    exitosGeneracionActual,
    maxPasosSimulacion,
    caminoDestacado,
    reiniciarPoblacion,
    avanzarUnaGeneracion,
    avanzar50Generaciones,
    cambiarConfiguracion,
  };
}
