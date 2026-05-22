import { Pestanas, ListaPestanas, DisparadorPestanas, ContenidoPestanas } from "@/components/ui/pestanas";
import { VisualizadorSeleccion } from "@/features/geneticos/components/VisualizadorSeleccion";
import { VisualizadorCruce } from "@/features/geneticos/components/VisualizadorCruce";
import { VisualizadorMutacion } from "@/features/geneticos/components/VisualizadorMutacion";

export function PaginaOperadores() {
  return (
    <div className="container page-stack">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Operadores Genéticos</h1>
        <p className="text-muted-foreground text-sm">
          Explora los diferentes tipos de operadores utilizados en la computación evolutiva.
        </p>
      </div>

      <Pestanas defaultValue="seleccion" className="w-full">
        <ListaPestanas className="w-full justify-start overflow-x-auto mb-6 flex gap-2">
          <DisparadorPestanas value="seleccion" className="text-sm">Selección</DisparadorPestanas>
          <DisparadorPestanas value="cruce" className="text-sm">Cruce</DisparadorPestanas>
          <DisparadorPestanas value="mutacion" className="text-sm">Mutación</DisparadorPestanas>
        </ListaPestanas>
        
        <ContenidoPestanas value="seleccion" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <VisualizadorSeleccion />
        </ContenidoPestanas>
        
        <ContenidoPestanas value="cruce" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <VisualizadorCruce />
        </ContenidoPestanas>
        
        <ContenidoPestanas value="mutacion" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <VisualizadorMutacion />
        </ContenidoPestanas>
      </Pestanas>
    </div>
  );
}
