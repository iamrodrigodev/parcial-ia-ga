import { Boton } from "@/components/ui/boton";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Play, Dna, Target, Route, Zap } from "lucide-react";

export function PaginaInicio() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Sección Principal: Explicación del Problema */}
      <Tarjeta>
        <EncabezadoTarjeta>
          <TituloTarjeta className="text-2xl flex items-center gap-2">
            <Route className="w-6 h-6 text-primary" />
            Resolución de Laberintos con Algoritmos Genéticos
          </TituloTarjeta>
          <DescripcionTarjeta className="text-base mt-2">
            Simulación de Inteligencia Artificial utilizando principios de evolución y selección natural.
          </DescripcionTarjeta>
        </EncabezadoTarjeta>
        <ContenidoTarjeta className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            El problema consiste en encontrar la ruta óptima desde un punto de inicio hasta la salida de un laberinto. 
            El algoritmo genético modela cada posible camino como un "cromosoma" (una secuencia de movimientos). 
            A través de múltiples generaciones, estas rutas compiten, se combinan y mutan, favoreciendo a aquellas 
            que logran acercarse más a la meta esquivando los obstáculos.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Boton comoHijo icono={Play} variante="primario" tamano="mediano">
              <a href="/laberinto">Iniciar Simulación</a>
            </Boton>
          </div>
        </ContenidoTarjeta>
      </Tarjeta>

      {/* Cuadrícula de Operadores Genéticos basados en la estructura de archivos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tarjeta de Selección */}
        <Tarjeta>
          <EncabezadoTarjeta>
            <TituloTarjeta className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              1. Selección
            </TituloTarjeta>
            <DescripcionTarjeta>
              Métodos para elegir las rutas más aptas para reproducirse.
            </DescripcionTarjeta>
          </EncabezadoTarjeta>
          <ContenidoTarjeta>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li><strong>Torneo:</strong> Competencia directa entre subgrupos aleatorios.</li>
              <li><strong>Ruleta:</strong> Probabilidad de selección proporcional a su éxito en el laberinto.</li>
              <li><strong>Ranking:</strong> Selección basada en la posición ordenada según su aptitud.</li>
              <li><strong>Elitismo:</strong> Preserva intactos a los mejores individuos para la siguiente generación.</li>
              <li><strong>Steady State:</strong> Reemplazo gradual de los peores individuos, manteniendo el resto.</li>
            </ul>
          </ContenidoTarjeta>
        </Tarjeta>

        {/* Tarjeta de Cruce */}
        <Tarjeta>
          <EncabezadoTarjeta>
            <TituloTarjeta className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-green-500" />
              2. Cruce
            </TituloTarjeta>
            <DescripcionTarjeta>
              Técnicas para combinar dos rutas padres y generar descendencia.
            </DescripcionTarjeta>
          </EncabezadoTarjeta>
          <ContenidoTarjeta>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li><strong>Un Punto:</strong> Divide las rutas en un solo índice y mezcla las mitades.</li>
              <li><strong>Dos Puntos:</strong> Intercambia un segmento interno completo entre dos rutas.</li>
              <li><strong>Uniforme:</strong> Intercambio de genes evaluado y decidido posición por posición.</li>
            </ul>
          </ContenidoTarjeta>
        </Tarjeta>

        {/* Tarjeta de Mutación */}
        <Tarjeta>
          <EncabezadoTarjeta>
            <TituloTarjeta className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              3. Mutación
            </TituloTarjeta>
            <DescripcionTarjeta>
              Alteraciones aleatorias para explorar nuevos caminos y evitar atascos.
            </DescripcionTarjeta>
          </EncabezadoTarjeta>
          <ContenidoTarjeta>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li><strong>Bit Flip:</strong> Invierte un movimiento de la ruta (ej. de Arriba a Abajo).</li>
              <li><strong>Intercambio:</strong> Cambia de posición dos pasos distintos en la misma ruta.</li>
              <li><strong>Inversión:</strong> Invierte el orden de ejecución de toda una subsecuencia de pasos.</li>
            </ul>
          </ContenidoTarjeta>
        </Tarjeta>

      </div>
    </div>
  );
}