import { useState, useEffect } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { individuosDeEjemplo } from "@/lib/geneticos/datos";
import { ejecutarSeleccionTorneo, ResultadoTorneo } from "@/lib/geneticos/seleccion";

// Extendemos los datos para tener más población (8 individuos)
const poblacionTorneo = [
  ...individuosDeEjemplo,
  { id: 6, nombre: "Ind 6", fitness: 2, color: "#8b5cf6", pctInicio: 0, pctFin: 0 },
  { id: 7, nombre: "Ind 7", fitness: 9, color: "#f97316", pctInicio: 0, pctFin: 0 },
  { id: 8, nombre: "Ind 8", fitness: 4, color: "#14b8a6", pctInicio: 0, pctFin: 0 },
];

export function Torneo() {
  const [paso, setPaso] = useState<0 | 1 | 2 | 3>(0);
  const [resultado, setResultado] = useState<ResultadoTorneo | null>(null);

  const iniciarTorneo = () => {
    if (paso !== 0 && paso !== 3) return;
    
    // K=3 por defecto
    const res = ejecutarSeleccionTorneo(poblacionTorneo, 3);
    setResultado(res);
    setPaso(1); // Selección
  };

  useEffect(() => {
    if (paso === 1) {
      const t = setTimeout(() => setPaso(2), 1500); // Pelea
      return () => clearTimeout(t);
    }
    if (paso === 2) {
      const t = setTimeout(() => setPaso(3), 2000); // Campeón
      return () => clearTimeout(t);
    }
  }, [paso]);

  const esConcursante = (id: number) => resultado?.concursantes.some(c => c.id === id);
  const esCampeon = (id: number) => resultado?.campeon.id === id;

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Selección por Torneo</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Competitiva</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Se elige al azar un grupo de <strong>K</strong> individuos de la población y se enfrentan entre sí. 
          El que tiene mayor fitness del grupo, gana y es seleccionado.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col items-center gap-6">
          
          <div className="flex flex-col xl:flex-row items-center justify-between w-full max-w-4xl gap-8 overflow-x-auto pb-4">
            
            {/* Population */}
            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-muted px-3 py-1 rounded-md">Población (N={poblacionTorneo.length})</span>
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-muted-foreground/50 relative flex items-center justify-center p-2 bg-background shadow-inner">
                {poblacionTorneo.map((ind, i) => {
                  const angle = (i * (360 / poblacionTorneo.length)) * (Math.PI / 180);
                  const radius = 70;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const highlight = paso > 0 && esConcursante(ind.id);
                  const dim = paso > 0 && !highlight;

                  return (
                    <motion.div
                      key={`pop-${ind.id}`}
                      animate={{ 
                        scale: highlight ? 1.2 : 1, 
                        opacity: dim ? 0.3 : 1,
                        boxShadow: highlight ? `0 0 15px ${ind.color}` : "none"
                      }}
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-black/20"
                      style={{ 
                        backgroundColor: ind.color,
                        x, y 
                      }}
                    >
                      f={ind.fitness}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <ArrowRight className={`text-muted-foreground transition-opacity ${paso >= 1 ? "opacity-100" : "opacity-20"}`} size={32} />

            {/* Contestants Arena */}
            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-md">Arena (K=3)</span>
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-amber-500/50 bg-amber-50 relative flex items-center justify-center shadow-inner">
                <AnimatePresence>
                  {paso >= 2 && resultado?.concursantes.map((ind, i) => {
                    const angle = (i * (360 / 3) - 90) * (Math.PI / 180);
                    const radius = 40;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isWinner = esCampeon(ind.id);
                    const dim = paso === 3 && !isWinner;

                    return (
                      <motion.div
                        key={`arena-${ind.id}`}
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{ 
                          scale: paso === 3 && isWinner ? 1.2 : 1, 
                          opacity: dim ? 0.3 : 1,
                          x, y
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white"
                        style={{ backgroundColor: ind.color }}
                      >
                        f={ind.fitness}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {paso < 2 && <span className="text-muted-foreground/50 text-sm font-medium">Esperando...</span>}
              </div>
            </div>

            <ArrowRight className={`text-muted-foreground transition-opacity ${paso >= 3 ? "opacity-100" : "opacity-20"}`} size={32} />

            {/* Champion Podium */}
            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-green-100 text-green-800 px-3 py-1 rounded-md">Ganador</span>
              <div className="flex items-end h-36 gap-1 border-b-4 border-border pb-1 px-8 relative">
                {/* 1st place podium block */}
                <div className="flex flex-col items-center z-10">
                  <AnimatePresence>
                    {paso === 3 && resultado && (
                      <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1.2 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white shadow-xl mb-2"
                        style={{ backgroundColor: resultado.campeon.color }}
                      >
                        f={resultado.campeon.fitness}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="w-16 h-20 bg-gradient-to-t from-amber-200 to-amber-100 border-t-4 border-amber-400 flex items-center justify-center font-bold text-amber-800 rounded-t-md shadow-inner">1°</div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-md mt-4">
            <Boton 
              onClick={iniciarTorneo} 
              disabled={paso === 1 || paso === 2}
              variante="primario"
              className="w-full font-bold shadow-md"
            >
              {paso === 1 || paso === 2 ? "Simulando..." : "Realizar Torneo (K=3)"}
            </Boton>
            
            <div className="h-10 flex items-center justify-center text-center">
              {paso === 0 && <p className="text-sm text-muted-foreground">Inicia el torneo para elegir 3 combatientes aleatorios.</p>}
              {paso === 1 && <p className="text-sm text-blue-600 font-medium animate-pulse">Seleccionando 3 individuos al azar de la población...</p>}
              {paso === 2 && <p className="text-sm text-amber-600 font-medium animate-pulse">Los combatientes se enfrentan. El mayor fitness ganará.</p>}
              {paso === 3 && resultado && (
                <p className="text-sm text-green-700 font-medium">
                  El <strong>{resultado.campeon.nombre}</strong> (f={resultado.campeon.fitness}) ha ganado el torneo y es seleccionado.
                </p>
              )}
            </div>
          </div>

        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
