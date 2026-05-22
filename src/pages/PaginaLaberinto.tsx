import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  SkipForward, 
  FastForward, 
  Sliders, 
  Award, 
  Flag, 
  Sparkles, 
  Dna, 
  MapPin, 
  HelpCircle,
  TrendingUp,
  X,
  Target
} from 'lucide-react';
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from '@/components/ui/tarjeta';
import { Boton } from '@/components/ui/boton';
import { Entrada } from '@/components/ui/entrada';
import { Insignia } from '@/components/ui/insignia';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ConfigLaberinto, 
  CeldaLaberinto, 
  MapaLaberinto, 
  Posicion, 
  CONFIGURACION_DEFECTO, 
  MAPAS_PREDEFINIDOS, 
  encontrarPosiciones 
} from '@/lib/geneticos/laberinto/config';
import { 
  IndividuoLaberinto, 
  crearIndividuoAleatorio, 
  evaluarPoblacion, 
  generarSiguienteGeneracion 
} from '@/lib/geneticos/laberinto/algoritmo';

export function PaginaLaberinto() {
  // 1. Configuration State
  const [config, setConfig] = useState<ConfigLaberinto>({ ...CONFIGURACION_DEFECTO });
  const [mapaId, setMapaId] = useState('medio'); // Default to medium map
  
  // 2. Algorithm & Simulation State
  const [poblacion, setPoblacion] = useState<IndividuoLaberinto[]>([]);
  const [generacion, setGeneracion] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  
  // 3. Animation State
  const [pasoSimulacion, setPasoSimulacion] = useState(0);
  const [mejorIndividuoHistorico, setMejorIndividuoHistorico] = useState<IndividuoLaberinto | null>(null);
  const [historialMejorFitness, setHistorialMejorFitness] = useState<{ gen: number; fitness: number }[]>([]);

  // 4. Reference for selected map structure
  const mapaActual = useMemo(() => {
    const seleccionado = MAPAS_PREDEFINIDOS.find((m) => m.id === mapaId);
    return seleccionado ? seleccionado.mapa : MAPAS_PREDEFINIDOS[0].mapa;
  }, [mapaId]);

  const { inicio, fin } = useMemo(() => encontrarPosiciones(mapaActual), [mapaActual]);

  // Dimensions
  const filas = mapaActual.length;
  const columnas = mapaActual[0].length;

  // Initialize/Reset population
  const reiniciarPoblacion = useCallback(() => {
    setReproduciendo(false);
    const nuevaPob: IndividuoLaberinto[] = [];
    for (let i = 1; i <= config.cantidadIndividuos; i++) {
      nuevaPob.push(crearIndividuoAleatorio(i, config.limitePasos));
    }
    const evaluada = evaluarPoblacion(nuevaPob, mapaActual, config);
    setPoblacion(evaluada);
    setGeneracion(1);
    setPasoSimulacion(0);
    setMejorIndividuoHistorico(evaluada[0]);
    setHistorialMejorFitness([{ gen: 1, fitness: evaluada[0].fitness }]);
  }, [config.cantidadIndividuos, config.limitePasos, mapaActual, config]);

  // Initialize on mount or when map/population size changes
  useEffect(() => {
    reiniciarPoblacion();
  }, [mapaId, config.cantidadIndividuos, config.limitePasos]);

  // Current Best Individual in the generation
  const mejorIndividuoGeneracion = useMemo(() => {
    if (poblacion.length === 0) return null;
    // Population is already sorted in descending order by fitness
    return poblacion[0];
  }, [poblacion]);

  // Track the absolute best individual across all generations
  useEffect(() => {
    if (mejorIndividuoGeneracion) {
      if (!mejorIndividuoHistorico || mejorIndividuoGeneracion.fitness > mejorIndividuoHistorico.fitness) {
        setMejorIndividuoHistorico(mejorIndividuoGeneracion);
      }
    }
  }, [mejorIndividuoGeneracion, mejorIndividuoHistorico]);

  // Count how many individuals reached the meta in the current generation
  const exitosGeneracionActual = useMemo(() => {
    return poblacion.filter((ind) => ind.alcanzoMeta).length;
  }, [poblacion]);

  // Max steps needed to animate the current generation's best path
  const maxPasosSimulacion = useMemo(() => {
    if (!mejorIndividuoGeneracion) return 0;
    return mejorIndividuoGeneracion.trayectoria.length - 1;
  }, [mejorIndividuoGeneracion]);

  // Increment step or advance generation
  const avanzarPasoSimulacion = useCallback(() => {
    // Step-by-step path animation mode
    if (pasoSimulacion < maxPasosSimulacion) {
      setPasoSimulacion((p) => p + 1);
    } else {
      // Walk complete! Evolve population to the next generation
      const siguientePob = generarSiguienteGeneracion(poblacion, mapaActual, config);
      setPoblacion(siguientePob);
      setGeneracion((g) => g + 1);
      setPasoSimulacion(0); // Reset animation step to start walking again
      setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguientePob[0].fitness }]);
    }
  }, [pasoSimulacion, maxPasosSimulacion, poblacion, mapaActual, config, generacion]);

  // Keep callback reference updated for stable interval execution without clearing it constantly
  const avanzarPasoSimulacionRef = useRef(avanzarPasoSimulacion);
  useEffect(() => {
    avanzarPasoSimulacionRef.current = avanzarPasoSimulacion;
  }, [avanzarPasoSimulacion]);

  // Simulation play interval
  useEffect(() => {
    if (!reproduciendo) return;
    
    // Fixed step speed at 1000ms by default
    const intervalo = setInterval(() => {
      avanzarPasoSimulacionRef.current();
    }, 1000);

    return () => clearInterval(intervalo);
  }, [reproduciendo]);

  // Advance 1 full Generation instantly
  const avanzarUnaGeneracion = () => {
    setReproduciendo(false);
    const siguientePob = generarSiguienteGeneracion(poblacion, mapaActual, config);
    setPoblacion(siguientePob);
    setGeneracion((g) => g + 1);
    setPasoSimulacion(siguientePob[0].trayectoria.length - 1); // Place individuals at final position
    setHistorialMejorFitness((h) => [...h.slice(-30), { gen: generacion + 1, fitness: siguientePob[0].fitness }]);
  };

  // Advance 50 Generations instantly (Fast forward)
  const avanzar50Generaciones = () => {
    setReproduciendo(false);
    let tempPob = [...poblacion];
    const nuevosRegistros: { gen: number; fitness: number }[] = [];

    for (let i = 0; i < 50; i++) {
      tempPob = generarSiguienteGeneracion(tempPob, mapaActual, config);
      nuevosRegistros.push({ gen: generacion + i + 1, fitness: tempPob[0].fitness });
    }

    setPoblacion(tempPob);
    setGeneracion((g) => g + 50);
    setPasoSimulacion(tempPob[0].trayectoria.length - 1); // Place at final positions
    setHistorialMejorFitness((h) => [...h.slice(-30), ...nuevosRegistros].slice(-30));
  };

  // Handle configuration value changes safely
  const cambiarConfiguracion = (campo: keyof ConfigLaberinto, valor: number) => {
    setConfig((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // UI Highlight Path for the best individual
  const caminoDestacado = useMemo(() => {
    if (!mejorIndividuoGeneracion) return [];
    // Draw path up to the current simulation step
    return mejorIndividuoGeneracion.trayectoria.slice(0, pasoSimulacion + 1);
  }, [mejorIndividuoGeneracion, pasoSimulacion]);

  // Decode movement arrows for showing the genome
  const obtenerIconoMovimiento = (gen: number) => {
    switch (gen) {
      case 0: return '•';  // Stay still
      case 1: return '→';  // Right
      case 2: return '←';  // Left
      case 3: return '↓';  // Down
      case 4: return '↑';  // Up
      default: return '?';
    }
  };

  const colorPorGen = (gen: number) => {
    switch (gen) {
      case 0: return 'text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800';
      case 1: return 'text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900';
      case 2: return 'text-purple-500 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900';
      case 3: return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900';
      case 4: return 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900';
      default: return 'text-zinc-500 bg-zinc-100';
    }
  };

  return (
    <div className="container page-stack">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent flex items-center gap-2">
            <Dna className="text-zinc-900 dark:text-white" size={32} />
            Resolución de Laberintos con Algoritmo Genético
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Simula poblaciones evolutivas cruzando cromosomas de movimiento para resolver laberintos discretos.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Boton
            variante={reproduciendo ? 'secundario' : 'primario'}
            icono={reproduciendo ? Pause : Play}
            onClick={() => setReproduciendo(!reproduciendo)}
            className="shadow-sm min-w-36 font-semibold"
          >
            <span>{reproduciendo ? 'Pausar' : 'Iniciar'}</span>
          </Boton>
          <Boton
            variante="secundario"
            icono={RotateCcw}
            onClick={reiniciarPoblacion}
            className="border"
            title="Reiniciar Simulación"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar Configurations vs Maze Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters Form and Predefined Maps */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Tarjeta className="border shadow-sm">
            <EncabezadoTarjeta className="pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="text-zinc-700" size={18} />
                <TituloTarjeta className="text-lg font-bold">Parámetros del Algoritmo</TituloTarjeta>
              </div>
              <DescripcionTarjeta className="text-xs">
                Ajusta en tiempo real los hiperparámetros evolutivos.
              </DescripcionTarjeta>
            </EncabezadoTarjeta>
            <ContenidoTarjeta className="space-y-4">
              
              {/* Map Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Seleccionar Mapa</label>
                <select
                  value={mapaId}
                  onChange={(e) => setMapaId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {MAPAS_PREDEFINIDOS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Population Size & Steps Limit */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Población por generación">
                    Población
                  </label>
                  <Entrada
                    type="number"
                    min={10}
                    max={500}
                    value={config.cantidadIndividuos}
                    onChange={(e) => cambiarConfiguracion('cantidadIndividuos', Math.max(10, parseInt(e.target.value) || 10))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Longitud fija del cromosoma (genes N)">
                    Límite Pasos (N)
                  </label>
                  <Entrada
                    type="number"
                    min={5}
                    max={200}
                    value={config.limitePasos}
                    onChange={(e) => cambiarConfiguracion('limitePasos', Math.max(5, parseInt(e.target.value) || 5))}
                  />
                </div>
              </div>

              {/* Mutation Rate & Tournament Size */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Probabilidad de mutación cíclica por gen">
                    Tasa Mutación
                  </label>
                  <Entrada
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={config.tasaMutacion}
                    onChange={(e) => cambiarConfiguracion('tasaMutacion', Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Tamaño del grupo para el Torneo de Selección">
                    Torneo (K)
                  </label>
                  <Entrada
                    type="number"
                    min={2}
                    max={20}
                    value={config.tamanoTorneo}
                    onChange={(e) => cambiarConfiguracion('tamanoTorneo', Math.max(2, parseInt(e.target.value) || 2))}
                  />
                </div>
              </div>

              <div className="border-t my-3 pt-3">
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2.5">Penalizaciones y Recompensas</h4>
                
                {/* Step Penalty & Wall Collision Penalty */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Costo asignado a cada paso dado">
                      Costo Paso
                    </label>
                    <Entrada
                      type="number"
                      max={0}
                      value={config.penalizacionPaso}
                      onChange={(e) => cambiarConfiguracion('penalizacionPaso', Math.min(0, parseInt(e.target.value) || 0))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Costo por intentar avanzar a un muro">
                      Costo Colisión
                    </label>
                    <Entrada
                      type="number"
                      max={0}
                      value={config.penalizacionMuro}
                      onChange={(e) => cambiarConfiguracion('penalizacionMuro', Math.min(0, parseInt(e.target.value) || 0))}
                    />
                  </div>
                </div>

                {/* Goal Reward */}
                <div className="flex flex-col gap-1.5 mt-3">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300" title="Bonificación por tocar la meta 'E'">
                    Recompensa Meta
                  </label>
                  <Entrada
                    type="number"
                    min={0}
                    value={config.recompensaMeta}
                    onChange={(e) => cambiarConfiguracion('recompensaMeta', Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>


            </ContenidoTarjeta>
          </Tarjeta>

          {/* Quick Metrics */}
          {mejorIndividuoHistorico && (
            <Tarjeta className="bg-zinc-50 dark:bg-zinc-900 border">
              <ContenidoTarjeta className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Award size={14} className="text-amber-500" />
                    Mejor Fitness Histórico
                  </span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {mejorIndividuoHistorico.fitness.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Colisiones / Pasos dados
                  </span>
                  <span className="text-xs font-bold">
                    {mejorIndividuoHistorico.colisiones} choc. / {mejorIndividuoHistorico.pasosDados} pas.
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Distancia Euclidiana final
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {mejorIndividuoHistorico.distanciaFinal.toFixed(2)} casillas
                  </span>
                </div>
              </ContenidoTarjeta>
            </Tarjeta>
          )}
        </div>

        {/* Right Side: Grid Laberinto, Controls & Population rendering */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Dashboard Bar: Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900 border p-3.5 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Generación</span>
                <span className="text-2xl font-black tabular-nums text-zinc-950 dark:text-white">{generacion}</span>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Mejor Fitness</span>
                <span className="text-2xl font-black tabular-nums text-zinc-950 dark:text-white">
                  {mejorIndividuoGeneracion ? mejorIndividuoGeneracion.fitness.toFixed(1) : '-'}
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Resuelto</span>
                <span className="flex items-center mt-1">
                  {mejorIndividuoGeneracion?.alcanzoMeta ? (
                    <Insignia className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold border-transparent px-2.5 py-0.5 text-xs">
                      ¡Éxito!
                    </Insignia>
                  ) : (
                    <Insignia className="bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 font-bold border-transparent px-2.5 py-0.5 text-xs animate-pulse">
                      Resolviendo...
                    </Insignia>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Boton
                variante="secundario"
                icono={ChevronRight}
                onClick={avanzarUnaGeneracion}
                disabled={reproduciendo}
                className="border h-9 text-xs"
                title="Avanzar exactamente 1 generación inmediatamente"
              >
                <span>+1 Gen</span>
              </Boton>
              <Boton
                variante="secundario"
                icono={FastForward}
                onClick={avanzar50Generaciones}
                disabled={reproduciendo}
                className="border h-9 text-xs"
                title="Avanzar 50 generaciones inmediatamente en segundo plano"
              >
                <span>+50 Gens</span>
              </Boton>
            </div>
          </div>

          {/* Maze Grid Visualizer */}
          <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border p-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-3 flex items-center gap-1">
              <MapPin size={12} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Dimensión: {columnas}x{filas}
              </span>
            </div>

            {/* Grid Box */}
            <div 
              className="grid gap-0.5 border border-zinc-300 dark:border-zinc-800 p-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-900/80 shadow-md w-full relative"
              style={{
                gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))`,
                maxWidth: `${columnas * 40}px`,
                aspectRatio: `${columnas} / ${filas}`
              }}
            >
              
              {/* Draw Grid Cells */}
              {mapaActual.map((fila, y) =>
                fila.map((celda, x) => {
                  const esInicio = celda === 'S';
                  const esFin = celda === 'E';
                  const esPared = celda === '1';

                  // Verify if this coordinate is part of the best individual's path
                  const esCaminoMejor = caminoDestacado.some((p) => p.x === x && p.y === y);

                  // Find ALL individuals currently located at this cell (x, y) at the active step
                  const individuosEnEstaCelda = poblacion.filter((ind) => {
                    const idx = Math.min(pasoSimulacion, ind.trayectoria.length - 1);
                    const pos = ind.trayectoria[idx] || inicio;
                    return pos.x === x && pos.y === y;
                  });

                  return (
                    <div
                      key={`celda-${x}-${y}`}
                      className={`relative aspect-square flex items-center justify-center rounded-sm transition-all duration-300 ${
                        esPared
                          ? 'bg-zinc-800 border border-zinc-700/80 shadow-inner'
                          : esInicio
                          ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-600 font-black'
                          : esFin
                          ? 'bg-amber-500/10 border border-amber-500 text-amber-500 font-black animate-pulse'
                          : 'bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900/50'
                      }`}
                    >
                      {/* Highlight Best Path */}
                      {esCaminoMejor && !esInicio && !esFin && (
                        <motion.div
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute w-2 h-2 rounded-full bg-indigo-500/80 shadow-sm shadow-indigo-400"
                        />
                      )}

                      {/* Display Icons on Start/End */}
                      {esInicio && <span className="text-[10px] uppercase font-bold tracking-tight">S</span>}
                      {esFin && <Flag size={14} className="text-amber-500" />}

                      {/* Render swarm inside this specific cell overlays */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        {individuosEnEstaCelda.map((ind) => {
                          const esElMejor = ind.id === mejorIndividuoGeneracion?.id;
                          
                          // Deterministic jitter to spread dots beautifully within the boundaries of this exact cell
                          const deX = ((ind.id * 5) % 14) - 7; // -7px to +7px
                          const deY = ((ind.id * 9) % 14) - 7;

                          return (
                            <motion.div
                              key={`ind-${ind.id}`}
                              layoutId={`ind-${ind.id}`}
                              animate={{
                                x: deX,
                                y: deY,
                                scale: esElMejor ? 1.4 : 1,
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                              }}
                              className={`absolute w-2 h-2 rounded-full shadow-sm border ${
                                esElMejor
                                  ? 'bg-indigo-600 border-white ring-2 ring-indigo-400/40 z-30 shadow-indigo-500/50 scale-125'
                                  : ind.alcanzoMeta
                                  ? 'bg-emerald-500 border-white z-20 shadow-emerald-400/40'
                                  : 'bg-zinc-500 border-zinc-200 z-10'
                              }`}
                              title={`Ind ${ind.id}: F=${ind.fitness.toFixed(1)}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Simulation step walk bar */}
            {mejorIndividuoGeneracion && (
              <div className="w-full max-w-[450px] mt-4 flex items-center justify-between gap-3 text-xs bg-white dark:bg-zinc-900 border rounded-lg p-2.5 shadow-sm">
                <span className="font-semibold text-muted-foreground">Animación</span>
                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div
                    className="absolute h-full bg-indigo-600 rounded transition-all duration-300"
                    style={{ width: `${(pasoSimulacion / maxPasosSimulacion) * 100}%` }}
                  />
                </div>
                <span className="font-bold tabular-nums text-zinc-800 dark:text-zinc-200">
                  {pasoSimulacion} / {maxPasosSimulacion}
                </span>
              </div>
            )}
          </div>

          {/* Genome visualization cards */}
          {mejorIndividuoGeneracion && (
            <Tarjeta className="border shadow-sm">
              <EncabezadoTarjeta className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-indigo-600" />
                    <TituloTarjeta className="text-base font-bold">
                      Cromosoma del Mejor Individuo Actual
                    </TituloTarjeta>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-150">
                    Aptitud: {mejorIndividuoGeneracion.fitness.toFixed(1)}
                  </span>
                </div>
                <DescripcionTarjeta className="text-xs mt-1">
                  Muestra la secuencia ordenada de genes (acciones de movimiento) del individuo más apto de esta generación.
                </DescripcionTarjeta>
              </EncabezadoTarjeta>
              <ContenidoTarjeta className="pb-4 pt-0">
                <div className="flex flex-wrap gap-1 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border max-h-[140px] overflow-y-auto">
                  {mejorIndividuoGeneracion.cromosoma.map((gen, idx) => {
                    const activeGeneIndex = mejorIndividuoGeneracion.trayectoria[pasoSimulacion]?.geneIndex ?? -1;
                    const esPasoActivo = idx <= activeGeneIndex;
                    return (
                      <span
                        key={`gen-${idx}`}
                        className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded border transition-all duration-300 shadow-sm ${colorPorGen(gen)} ${
                          esPasoActivo ? 'ring-2 ring-indigo-500 ring-offset-1 scale-105 z-10' : 'opacity-70'
                        }`}
                        title={`Gen ${idx}: Valor ${gen} (${obtenerIconoMovimiento(gen)})`}
                      >
                        {obtenerIconoMovimiento(gen)}
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-[11px] font-semibold text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-zinc-150 border inline-block" />
                    <span>• Quedarse quieto</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-100 border inline-block" />
                    <span>→ Derecha</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-purple-100 border inline-block" />
                    <span>← Izquierda</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-100 border inline-block" />
                      <span className="w-2.5 h-2.5 rounded bg-rose-100 border inline-block" />
                    </div>
                    <span>↓ Abajo / ↑ Arriba</span>
                  </div>
                </div>
              </ContenidoTarjeta>
            </Tarjeta>
          )}

          {/* Quick Informational note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Tarjeta className="border p-4 bg-muted/5">
              <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide flex items-center gap-1">
                <Sparkles size={13} className="text-zinc-600" />
                Convergencia Evolutiva
              </h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                El algoritmo aplica <strong>Elitismo (2 progenitores top)</strong> preservándolos intactos. Esto garantiza que la aptitud máxima nunca decaiga entre generaciones y permite converger de forma constante hacia la meta.
              </p>
            </Tarjeta>

            <Tarjeta className="border p-4 bg-muted/5">
              <h4 className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide flex items-center gap-1">
                <Target size={13} className="text-zinc-600" />
                Cómo Resolver Laberintos
              </h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Si la población tiene dificultades, intenta **aumentar el tamaño del Torneo (K)** para dar mayor prioridad de selección a los mejores individuos, o **aumentar la Tasa de Mutación** para inyectar diversidad genómica en laberintos intrincados.
              </p>
            </Tarjeta>
          </div>

        </div>

      </div>
    </div>
  );
}
