import { Play, Pause, RotateCcw, Dna } from 'lucide-react';
import { PanelConfiguracionLaberinto } from '@/features/laberinto/components/PanelConfiguracionLaberinto';
import { GridLaberinto } from '@/features/laberinto/components/GridLaberinto';
import { Boton } from '@/components/ui/boton';
import { useLaberintoGA } from '@/features/laberinto/hooks/useLaberintoGA';
import { PanelMetricasLaberinto } from '@/features/laberinto/components/PanelMetricasLaberinto';
import { BarraControlLaberinto } from '@/features/laberinto/components/BarraControlLaberinto';
import { PanelCromosomaLaberinto } from '@/features/laberinto/components/PanelCromosomaLaberinto';
import { PanelNotasLaberinto } from '@/features/laberinto/components/PanelNotasLaberinto';

export function PaginaLaberinto() {
  const {
    config,
    mapaId,
    setMapaId,
    poblacion,
    generacion,
    reproduciendo,
    setReproduciendo,
    pasoSimulacion,
    mejorIndividuoHistorico,
    mapaActual,
    inicio,
    mejorIndividuoGeneracion,
    maxPasosSimulacion,
    caminoDestacado,
    reiniciarPoblacion,
    avanzarUnaGeneracion,
    avanzar50Generaciones,
    cambiarConfiguracion,
  } = useLaberintoGA();

  const filas = mapaActual.length;
  const columnas = mapaActual[0].length;
  const usaDistanciaEuclidiana = Math.max(filas, columnas) <= 12;
  const fitnessVisible = mejorIndividuoGeneracion
    ? mejorIndividuoGeneracion.fitness * (maxPasosSimulacion > 0 ? pasoSimulacion / maxPasosSimulacion : 1)
    : null;

  const obtenerIconoMovimiento = (gen: number) => {
    switch (gen) {
      case 0: return '•';
      case 1: return '→';
      case 2: return '←';
      case 3: return '↓';
      case 4: return '↑';
      default: return '?';
    }
  };

  const colorPorGen = (gen: number) => {
    switch (gen) {
      case 0: return 'text-zinc-400 bg-zinc-100 border-zinc-200';
      case 1: return 'text-blue-500 bg-blue-50 border-blue-200';
      case 2: return 'text-purple-500 bg-purple-50 border-purple-200';
      case 3: return 'text-emerald-500 bg-emerald-50 border-emerald-200';
      case 4: return 'text-rose-500 bg-rose-50 border-rose-200';
      default: return 'text-zinc-500 bg-zinc-100';
    }
  };

  return (
    <div className="container page-stack font-sans">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent flex items-center gap-2">
            <Dna className="text-zinc-900" size={32} />
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
            variante="primario"
            icono={RotateCcw}
            onClick={reiniciarPoblacion}
            className=""
            title="Reiniciar Simulación"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar Configurations vs Maze Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PanelConfiguracionLaberinto
            config={config}
            mapaId={mapaId}
            setMapaId={setMapaId}
            cambiarConfiguracion={cambiarConfiguracion}
          />

          <PanelMetricasLaberinto
            mejorIndividuoHistorico={mejorIndividuoHistorico}
            usaDistanciaEuclidiana={usaDistanciaEuclidiana}
          />
          <PanelNotasLaberinto />
        </div>

        {/* Right Side: Grid Laberinto, Controls & Population rendering */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <BarraControlLaberinto
            generacion={generacion}
            mejorIndividuoGeneracion={mejorIndividuoGeneracion}
            fitnessVisible={fitnessVisible}
            reproduciendo={reproduciendo}
            avanzarUnaGeneracion={avanzarUnaGeneracion}
            avanzar50Generaciones={avanzar50Generaciones}
          />
          <GridLaberinto
            mapaActual={mapaActual}
            filas={filas}
            columnas={columnas}
            caminoDestacado={caminoDestacado}
            poblacion={poblacion}
            pasoSimulacion={pasoSimulacion}
            mejorIndividuoGeneracion={mejorIndividuoGeneracion}
            inicio={inicio}
            maxPasosSimulacion={maxPasosSimulacion}
          />

          <PanelCromosomaLaberinto
            mejorIndividuoGeneracion={mejorIndividuoGeneracion}
            pasoSimulacion={pasoSimulacion}
            obtenerIconoMovimiento={obtenerIconoMovimiento}
            colorPorGen={colorPorGen}
          />

        </div>

      </div>
    </div>
  );
}

