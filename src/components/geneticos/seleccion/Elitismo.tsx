import { useState, useEffect } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";

const poblacionInicial = [
  { id: 1, f: 90, color: "#22c55e", rank: 1 }, // Elite
  { id: 2, f: 85, color: "#10b981", rank: 2 }, // Elite
  { id: 3, f: 60, color: "#eab308", rank: 3 },
  { id: 4, f: 45, color: "#f97316", rank: 4 },
  { id: 5, f: 20, color: "#ef4444", rank: 5 },
];

export function Elitismo() {
  const [paso, setPaso] = useState<0 | 1 | 2 | 3>(0);
  const [poblacionNueva, setPoblacionNueva] = useState<any[]>([]);

  const evolucionar = () => {
    if (paso !== 0 && paso !== 3) return;
    
    if (paso === 3) {
      setPoblacionNueva([]);
      setPaso(0);
      setTimeout(() => setPaso(1), 100);
      return;
    }
    
    setPaso(1);
  };

  useEffect(() => {
    if (paso === 1) {
      const t = setTimeout(() => {
        setPoblacionNueva([
          { id: 1, f: 90, color: "#22c55e", rank: 1, type: 'elite' },
          { id: 2, f: 85, color: "#10b981", rank: 2, type: 'elite' },
        ]);
        setPaso(2);
      }, 1000); // Elites llegan
      return () => clearTimeout(t);
    }
    if (paso === 2) {
      const t = setTimeout(() => {
        setPoblacionNueva(prev => [
          ...prev,
          { id: 10, f: 75, color: "#3b82f6", rank: 3, type: 'new' },
          { id: 11, f: 55, color: "#6366f1", rank: 4, type: 'new' },
          { id: 12, f: 30, color: "#8b5cf6", rank: 5, type: 'new' }
        ]);
        setPaso(3);
      }, 2000); // El resto cruza y muta
      return () => clearTimeout(t);
    }
  }, [paso]);

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Selección por Elitismo</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Garantiza progreso</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Obliga a que los <strong>N</strong> mejores individuos de la población actual pasen a la siguiente generación directamente y sin sufrir modificaciones.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col items-center gap-6">
          
          <div className="flex flex-col lg:flex-row items-stretch justify-between w-full max-w-4xl py-4 relative min-h-[350px]">
            
            {/* Present Generation */}
            <div className="flex flex-col flex-1 relative z-10 w-full lg:w-1/3">
              <span className="font-semibold mb-4 text-center bg-muted px-3 py-1 rounded-md text-sm">Generación Actual</span>
              <div className="flex flex-col gap-2">
                {poblacionInicial.map((ind, i) => {
                  const isElite = i < 2;
                  return (
                    <motion.div
                      key={`curr-${ind.id}`}
                      className={`h-10 rounded-md flex items-center justify-between px-3 text-white font-bold text-sm shadow-sm border-2 ${isElite ? 'border-amber-400' : 'border-transparent'}`}
                      style={{ backgroundColor: ind.color }}
                      animate={{ opacity: paso >= 1 && isElite ? 0.4 : (paso >= 2 && !isElite ? 0.4 : 1) }}
                    >
                      <span className="flex items-center gap-2">
                        {isElite && <span className="bg-amber-400 text-amber-900 text-[10px] px-1 rounded">Élite</span>}
                        Ind {ind.id}
                      </span>
                      <span>f={ind.f}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Middle Paths */}
            <div className="flex flex-col items-center justify-center flex-1 relative z-0 py-8 lg:py-0 w-full lg:w-1/3 min-h-[100px]">
              
              {/* Path Top (Elites) */}
              <div className="absolute top-[20%] lg:top-[15%] w-full flex items-center justify-center">
                <ArrowRight className={`text-amber-500 transition-opacity ${paso >= 1 ? "opacity-100" : "opacity-10"}`} size={32} />
                <span className={`absolute -top-6 text-xs font-bold text-amber-600 bg-amber-50 px-2 rounded border border-amber-200 transition-opacity ${paso >= 1 ? "opacity-100" : "opacity-0"}`}>
                  Clonación Directa
                </span>
              </div>

              {/* Path Bottom (Operations) */}
              <div className="absolute top-[70%] lg:top-[65%] w-full flex flex-col items-center justify-center">
                <motion.div 
                  animate={{ rotate: paso === 2 ? 360 : 0 }}
                  transition={{ duration: 2, ease: "linear", repeat: paso === 2 ? Infinity : 0 }}
                  className={`bg-zinc-800 text-white p-3 rounded-full shadow-lg border-2 border-zinc-600 transition-opacity ${paso >= 1 ? "opacity-100" : "opacity-50"}`}
                >
                  <Settings size={28} />
                </motion.div>
                <span className={`mt-2 text-xs font-bold text-zinc-700 bg-zinc-100 px-2 rounded border border-zinc-300 transition-opacity ${paso >= 2 ? "opacity-100" : "opacity-50"}`}>
                  Cruce & Mutación
                </span>
              </div>
            </div>

            {/* Next Generation */}
            <div className="flex flex-col flex-1 relative z-10 w-full lg:w-1/3">
              <span className="font-semibold mb-4 text-center bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-sm border border-blue-200">Nueva Generación</span>
              <div className="flex flex-col gap-2 h-full border-2 border-dashed border-blue-200 rounded-lg p-2 bg-blue-50/30">
                {poblacionNueva.map((ind) => (
                  <motion.div
                    key={`new-${ind.id}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`h-10 rounded-md flex items-center justify-between px-3 text-white font-bold text-sm shadow-sm border-2 ${ind.type === 'elite' ? 'border-amber-400' : 'border-transparent'}`}
                    style={{ backgroundColor: ind.color }}
                  >
                    <span className="flex items-center gap-2">
                      {ind.type === 'elite' ? <span className="bg-amber-400 text-amber-900 text-[10px] px-1 rounded">Élite</span> : <span className="bg-white/20 text-white text-[10px] px-1 rounded">Hijo</span>}
                      {ind.type === 'elite' ? `Ind ${ind.id}` : `Nuevo ${ind.id}`}
                    </span>
                    <span>f={ind.f}</span>
                  </motion.div>
                ))}
                {poblacionNueva.length === 0 && (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground/50 text-sm font-medium">
                    Esperando población...
                  </div>
                )}
                {poblacionNueva.length > 0 && poblacionNueva.length < 5 && (
                  <div className="flex-1 flex items-center justify-center text-blue-400 text-sm font-medium animate-pulse">
                    Procesando genética...
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-md mt-4">
            <Boton 
              onClick={evolucionar} 
              disabled={paso === 1 || paso === 2}
              variante="primario"
              className="w-full font-bold shadow-md"
            >
              {paso === 1 || paso === 2 ? "Evolucionando..." : paso === 3 ? "Reiniciar Evolución" : "Avanzar Generación (N=2)"}
            </Boton>
            
            <div className="h-12 flex items-center justify-center text-center px-4">
              {paso === 0 && <p className="text-sm text-muted-foreground">Inicia el proceso para asegurar a la élite.</p>}
              {paso === 1 && <p className="text-sm text-amber-600 font-medium animate-pulse">Los 2 mejores individuos saltan intactos a la nueva generación.</p>}
              {paso === 2 && <p className="text-sm text-blue-600 font-medium">El resto de la población está siendo reemplazada por nueva descendencia generada por cruce y mutación.</p>}
              {paso === 3 && (
                <p className="text-sm text-green-700 font-medium">
                  Nueva generación completada. El 100% de la élite sobrevivió para mantener el progreso evolutivo general.
                </p>
              )}
            </div>
          </div>

        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
