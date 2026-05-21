import { useState, useMemo } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { individuosDeEjemplo as individuos } from "@/lib/geneticos/datos";
import { ejecutarSeleccionRanking } from "@/lib/geneticos/seleccion";

export function Ranking() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  // Calcular la data inicial de rangos para renderizar antes de girar
  const rankData = useMemo(() => {
    return ejecutarSeleccionRanking(individuos, 0).individuosRankeados;
  }, []);

  const girar = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedId(null);
    setRandomNumber(null);
    
    const resultado = ejecutarSeleccionRanking(individuos, rotation);
    
    setRotation(resultado.nuevaRotacion);
    
    setTimeout(() => {
      setIsSpinning(false);
      setRandomNumber(resultado.numeroAleatorio);
      setSelectedId(resultado.ganador.id);
    }, 3500);
  };

  // Generar conic-gradient dinámico
  const conicGradient = rankData.map(ind => `${ind.color} ${ind.pctInicioRank}% ${ind.pctFinRank}%`).join(", ");

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Selección por Ranking</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Ordinal</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Evita que los individuos "super-dotados" acaparen toda la ruleta. En lugar de usar el fitness absoluto, 
          los individuos se ordenan (rankean) y las porciones de la ruleta se asignan según su posición.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/20 p-6 rounded-xl border flex flex-col items-center gap-8 mt-4">
          
          <div className="flex flex-col xl:flex-row items-center gap-8 w-full justify-center">
            {/* Table */}
            <div className="bg-background border rounded-lg overflow-hidden shadow-sm text-sm">
              <table className="min-w-[200px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Ranking</th>
                    <th className="px-4 py-2 text-right font-semibold">Aptitud</th>
                    <th className="px-4 py-2 text-right font-semibold">Prob.</th>
                  </tr>
                </thead>
                <tbody>
                  {[...rankData].reverse().map((ind) => (
                    <tr key={ind.id} className={`border-t transition-colors ${selectedId === ind.id ? "bg-blue-50/80 font-bold" : ""}`}>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ind.color }}></div>
                        {ind.ranking}° ({ind.nombre})
                      </td>
                      <td className="px-4 py-2 text-right">{ind.fitness}</td>
                      <td className="px-4 py-2 text-right">{ind.prob.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Arrows Layout */}
            <div className="hidden xl:flex flex-col items-center justify-center gap-2">
              <ArrowRight className="text-muted-foreground/50" size={32} />
            </div>
            <div className="flex xl:hidden flex-col items-center justify-center gap-2">
              <ArrowDown className="text-muted-foreground/50" size={32} />
            </div>

            {/* Interactive Roulette */}
            <div className="flex flex-col sm:flex-row items-center gap-8 bg-background p-6 rounded-xl border shadow-sm">
              
              {/* Wheel Container */}
              <div className="relative flex flex-col items-center">
                {/* Pointer */}
                <div className="absolute -top-4 z-10 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-black drop-shadow-md"></div>
                
                {/* Pie Chart */}
                <motion.div 
                   className="w-48 h-48 rounded-full border-4 border-background shadow-[0_0_15px_rgba(0,0,0,0.1)] shrink-0" 
                   style={{ 
                     background: `conic-gradient(${conicGradient})` 
                   }}
                   animate={{ rotate: rotation }}
                   transition={{ duration: 3.5, ease: [0.15, 0.8, 0.1, 1] }}
                />
                
                <Boton 
                  onClick={girar} 
                  disabled={isSpinning}
                  variante="primario"
                  className="mt-6 font-bold w-full shadow-md"
                >
                  {isSpinning ? "Girando..." : "Girar Ranking"}
                </Boton>
              </div>
              
              {/* Legend & Result */}
              <div className="flex flex-col min-w-[160px] gap-6">
                <div className="flex flex-col gap-2 text-xs font-medium">
                  {rankData.map((ind) => (
                    <div key={ind.id} className={`flex items-center justify-between p-1.5 rounded transition-all ${selectedId === ind.id ? "bg-blue-50 ring-1 ring-blue-500 shadow-sm transform scale-105" : ""}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: ind.color }}></div>
                        <span className={selectedId === ind.id ? "font-bold text-blue-700" : ""}>{ind.ranking}°</span>
                      </div>
                      <span className={selectedId === ind.id ? "font-bold text-blue-700" : "text-muted-foreground"}>
                        {ind.prob.toFixed(1)}%
                      </span>
                    </div>
                  )).reverse()}
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="flex items-center gap-4 h-12">
              {randomNumber !== null && selectedId !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="bg-background border px-4 py-2 rounded-md shadow-sm font-medium">
                    Número aleatorio = <span className="font-bold text-lg">{randomNumber}</span>
                  </div>
                  <ArrowRight className="text-muted-foreground hidden sm:block" size={24} />
                  <ArrowDown className="text-muted-foreground sm:hidden" size={24} />
                  <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-md shadow-sm font-bold text-lg">
                    El {rankData.find(i => i.id === selectedId)?.nombre} es seleccionado
                  </div>
                </motion.div>
              )}
            </div>
            
            {randomNumber !== null && selectedId !== null && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground max-w-lg text-center"
              >
                El número aleatorio <strong>{randomNumber}</strong> cae dentro de la porción del <strong>{rankData.find(i => i.id === selectedId)?.nombre}</strong> (Ranking {rankData.find(i => i.id === selectedId)?.ranking}°).
              </motion.p>
            )}
            
            {randomNumber === null && !isSpinning && (
              <p className="text-sm text-muted-foreground max-w-lg text-center">
                Haz clic en "Girar Ranking" para seleccionar según las porciones proporcionales al ranking, no al fitness absoluto.
              </p>
            )}
          </div>

        </div>
        
        <p className="text-sm text-muted-foreground mt-4 text-center">
          A pesar de que el Individuo 4 tiene un fitness muy alto, su porción en la ruleta se limita a su ranking (5°), manteniendo la diversidad.
        </p>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
