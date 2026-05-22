import { useState, useEffect } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight, Settings, CopyCheck } from "lucide-react";
import { motion } from "framer-motion";

const poblacionInicial = [
  { id: 1, f: 90, color: "#22c55e", rank: 1 },
  { id: 2, f: 85, color: "#10b981", rank: 2 },
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
      return;
    }
    setPaso(1);
  };

  useEffect(() => {
    if (paso === 1) {
      const t = setTimeout(() => {
        setPoblacionNueva([
          { id: 1, f: 90, color: "#22c55e", rank: 1, type: "elite" },
          { id: 2, f: 85, color: "#10b981", rank: 2, type: "elite" },
        ]);
        setPaso(2);
      }, 900);
      return () => clearTimeout(t);
    }
    if (paso === 2) {
      const t = setTimeout(() => {
        setPoblacionNueva((prev) => [
          ...prev,
          { id: 10, f: 75, color: "#3b82f6", rank: 3, type: "new" },
          { id: 11, f: 55, color: "#6366f1", rank: 4, type: "new" },
          { id: 12, f: 30, color: "#8b5cf6", rank: 5, type: "new" },
        ]);
        setPaso(3);
      }, 1700);
      return () => clearTimeout(t);
    }
  }, [paso]);

  const total = 5;
  const elites = poblacionNueva.filter((x) => x.type === "elite").length;
  const hijos = poblacionNueva.filter((x) => x.type === "new").length;

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Seleccion por Elitismo</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Garantiza progreso</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Los <strong>N</strong> mejores individuos pasan directo a la siguiente generacion sin modificacion; el resto se completa con descendencia nueva.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col items-center gap-5">
          <div className="w-full max-w-4xl grid grid-cols-4 gap-2">
            {["1. Identificar elite", "2. Clonar elite", "3. Generar hijos", "4. Nueva generacion"].map((label, idx) => {
              const active = paso >= idx;
              return (
                <div key={label} className={`h-9 rounded-md border text-xs font-semibold flex items-center justify-center ${active ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400 border-zinc-200"}`}>
                  {label}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between w-full max-w-4xl py-2 gap-5">
            <div className="flex flex-col flex-1">
              <span className="font-semibold mb-3 text-center bg-muted px-3 py-1 rounded-md text-sm">Generacion Actual</span>
              <div className="flex flex-col gap-2">
                {poblacionInicial.map((ind, i) => {
                  const isElite = i < 2;
                  return (
                    <motion.div
                      key={`curr-${ind.id}`}
                      className={`h-10 rounded-md flex items-center justify-between px-3 text-white font-bold text-sm shadow-sm border-2 ${isElite ? "border-amber-400" : "border-transparent"}`}
                      style={{ backgroundColor: ind.color }}
                      animate={{ opacity: paso >= 1 && isElite ? 0.45 : paso >= 2 && !isElite ? 0.45 : 1 }}
                    >
                      <span className="flex items-center gap-2">
                        {isElite && <span className="bg-amber-400 text-amber-900 text-[10px] px-1 rounded">Elite</span>}
                        Ind {ind.id}
                      </span>
                      <span>f={ind.f}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-h-[180px]">
              <div className="w-full flex items-center justify-center gap-2 mb-4">
                <ArrowRight className={`text-amber-500 ${paso >= 1 ? "opacity-100" : "opacity-20"}`} size={28} />
                <span className={`text-xs font-bold px-2 py-1 rounded border ${paso >= 1 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-zinc-400 bg-zinc-100 border-zinc-200"}`}>
                  Clonacion directa
                </span>
              </div>

              <motion.div
                animate={{ rotate: paso === 2 ? 360 : 0 }}
                transition={{ duration: 1.6, ease: "linear", repeat: paso === 2 ? Infinity : 0 }}
                className={`p-3 rounded-full border-2 ${paso >= 2 ? "bg-zinc-800 text-white border-zinc-600" : "bg-zinc-200 text-zinc-500 border-zinc-300"}`}
              >
                <Settings size={24} />
              </motion.div>
              <span className={`mt-2 text-xs font-bold px-2 py-1 rounded border ${paso >= 2 ? "text-zinc-700 bg-zinc-100 border-zinc-300" : "text-zinc-400 bg-zinc-100 border-zinc-200"}`}>
                Cruce y mutacion
              </span>
            </div>

            <div className="flex flex-col flex-1">
              <span className="font-semibold mb-3 text-center bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-sm border border-blue-200">Nueva Generacion</span>
              <div className="flex items-center justify-between text-[11px] text-zinc-600 mb-2">
                <span>Elite: {elites}/2</span>
                <span>Hijos: {hijos}/3</span>
                <span>Total: {poblacionNueva.length}/{total}</span>
              </div>
              <div className="h-2 bg-zinc-200 rounded mb-2 overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${(poblacionNueva.length / total) * 100}%` }} />
              </div>
              <div className="flex flex-col gap-2 h-full border-2 border-dashed border-blue-200 rounded-lg p-2 bg-blue-50/30 min-h-[232px]">
                {poblacionNueva.map((ind) => (
                  <motion.div
                    key={`new-${ind.id}`}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`h-10 rounded-md flex items-center justify-between px-3 text-white font-bold text-sm shadow-sm border-2 ${ind.type === "elite" ? "border-amber-400" : "border-transparent"}`}
                    style={{ backgroundColor: ind.color }}
                  >
                    <span className="flex items-center gap-2">
                      {ind.type === "elite" ? <CopyCheck size={14} /> : <span className="bg-white/20 text-white text-[10px] px-1 rounded">Hijo</span>}
                      {ind.type === "elite" ? `Ind ${ind.id}` : `Nuevo ${ind.id}`}
                    </span>
                    <span>f={ind.f}</span>
                  </motion.div>
                ))}
                {poblacionNueva.length === 0 && <div className="h-full w-full flex items-center justify-center text-muted-foreground/50 text-sm font-medium">Esperando poblacion...</div>}
                {poblacionNueva.length > 0 && poblacionNueva.length < 5 && <div className="flex-1 flex items-center justify-center text-blue-500 text-sm font-medium animate-pulse">Completando lugares restantes...</div>}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            <Boton onClick={evolucionar} disabled={paso === 1 || paso === 2} variante="primario" className="w-full font-bold shadow-md">
              {paso === 1 || paso === 2 ? "Evolucionando..." : paso === 3 ? "Reiniciar Evolucion" : "Avanzar Generacion (N=2)"}
            </Boton>
            <div className="h-12 flex items-center justify-center text-center px-4">
              {paso === 0 && <p className="text-sm text-muted-foreground">Presiona el boton para ejecutar la seleccion elitista paso a paso.</p>}
              {paso === 1 && <p className="text-sm text-amber-600 font-medium">Paso 2: los 2 mejores pasan directos, sin cambios.</p>}
              {paso === 2 && <p className="text-sm text-blue-600 font-medium">Paso 3: se generan 3 hijos por cruce y mutacion para completar N.</p>}
              {paso === 3 && <p className="text-sm text-green-700 font-medium">Listo: la nueva generacion conserva la elite y agrega descendencia nueva.</p>}
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
