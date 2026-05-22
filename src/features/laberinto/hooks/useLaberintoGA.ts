import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfigLaberinto, CONFIGURACION_DEFECTO, MAPAS_PREDEFINIDOS, encontrarPosiciones } from "@/features/laberinto/lib/config";
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

  const reiniciarPoblacion = useCallback(() => {
    setReproduciendo(false);
    const nuevaPob: IndividuoLaberinto[] = [];
    for (let i = 1; i <= config.cantidadIndividuos; i++) nuevaPob.push(crearIndividuoAleatorio(i, config.limitePasos));
    const evaluada = evaluarPoblacion(nuevaPob, mapaActual, config);
    setPoblacion(evaluada);
    setGeneracion(1);
    setPasoSimulacion(0);
    setMejorIndividuoHistorico(evaluada[0]);
    setHistorialMejorFitness([{ gen: 1, fitness: evaluada[0].fitness }]);
  }, [config, mapaActual]);

  useEffect(() => {
    reiniciarPoblacion();
  }, [mapaId, config.cantidadIndividuos, config.limitePasos, reiniciarPoblacion]);

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
    setConfig((prev) => ({ ...prev, [campo]: valor }));
  }, []);

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
