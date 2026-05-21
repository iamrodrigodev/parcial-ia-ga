import { useState, useEffect } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { motion, AnimatePresence } from "framer-motion";

/* ── Data ────────────────────────────────────── */
const initPop = [
  { id: 1, f: 60, segments: ["bg-teal-500", "bg-zinc-900", "bg-white"] },
  { id: 2, f: 90, segments: ["bg-teal-500", "bg-zinc-900", "bg-teal-500"] },
  { id: 3, f: 85, segments: ["bg-white", "bg-teal-500", "bg-zinc-900"] },
  { id: 4, f: 15, segments: ["bg-zinc-900", "bg-white", "bg-teal-500"] },
  { id: 5, f: 10, segments: ["bg-zinc-900", "bg-zinc-900", "bg-white"] },
];

const offspringData = [
  { id: 98, f: 88, segments: ["bg-teal-500", "bg-teal-500", "bg-zinc-900"] },
  { id: 99, f: 92, segments: ["bg-white", "bg-teal-500", "bg-teal-500"] },
];

/* ── Chromosome brick ────────────────────────── */
function Chromo({ segs, glow = "", dim = false }: {
  segs: string[]; glow?: string; dim?: boolean;
}) {
  return (
    <div className={`flex h-8 w-28 border-2 ${glow || "border-zinc-400"} rounded-[3px] overflow-hidden shadow-sm transition-all duration-500 ${dim ? "opacity-25 scale-95" : "opacity-100"}`}>
      {segs.map((s, i) => (
        <div key={i} className={`flex-1 ${s} ${i > 0 ? "border-l border-zinc-400/60" : ""}`} />
      ))}
    </div>
  );
}

/* ── Arrow SVG ────────────────────────── */
function Arrow({ active }: { active: boolean }) {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="shrink-0">
      <motion.line
        x1="0" y1="12" x2="36" y2="12"
        stroke="currentColor" strokeWidth="2"
        className="text-zinc-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.polygon
        points="36,6 48,12 36,18"
        fill="currentColor"
        className="text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      />
    </svg>
  );
}

/* ── Main component ──────────────────────────── */
export function SteadyState() {
  const [paso, setPaso] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [pop, setPop] = useState(initPop);

  const iniciar = () => {
    if (paso > 0 && paso < 4) return;
    if (paso === 4) {
      setPop(initPop);
      setPaso(0);
      setTimeout(() => setPaso(1), 150);
      return;
    }
    setPaso(1);
  };

  useEffect(() => {
    if (paso === 1) { const t = setTimeout(() => setPaso(2), 2000); return () => clearTimeout(t); }
    if (paso === 2) { const t = setTimeout(() => setPaso(3), 2200); return () => clearTimeout(t); }
    if (paso === 3) {
      const t = setTimeout(() => {
        setPop([initPop[0], initPop[1], initPop[2], offspringData[0], offspringData[1]]);
        setPaso(4);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [paso]);

  const stepTexts: Record<number, { text: string; color: string }> = {
    0: { text: "Presiona el botón para comenzar la simulación paso a paso.", color: "text-muted-foreground" },
    1: { text: "Paso 1 · Se identifican los 2 mejores (verde) y los 2 peores (rojo) de la población.", color: "text-emerald-700" },
    2: { text: "Paso 2 · Los 2 mejores son seleccionados y extraídos para reproducirse.", color: "text-blue-700" },
    3: { text: "Paso 3 · Mediante cruce y mutación, se genera nueva descendencia.", color: "text-violet-700" },
    4: { text: "Paso 4 · La descendencia viaja de vuelta y reemplaza a los 2 peores. El resto sobrevive intacto.", color: "text-amber-700" },
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Selección de Estado de Equilibrio</TituloTarjeta>
          <Insignia className="bg-black text-white px-3 py-1 text-sm font-semibold hover:bg-black/90 border-transparent">Reemplazo Parcial</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Los cromosomas con más alto fitness se reproducen, y esta descendencia reemplazará a los cromosomas con más bajo fitness.
          El resto de cromosomas sobreviven a la siguiente generación intactos.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>

      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col items-center gap-6">

          {/* ─── Step indicator ─── */}
          <div className="flex items-center gap-2 w-full max-w-lg">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500 ${
                  paso >= s ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400 border-zinc-300"
                }`}>{s}</div>
                <div className={`h-1 w-full rounded-full transition-all duration-700 ${paso >= s ? "bg-zinc-800" : "bg-zinc-200"}`} />
              </div>
            ))}
          </div>

          {/* ─── Diagram: top row (forward flow) ─── */}
          <div className="w-full overflow-x-auto">
            <div className="flex items-start justify-center gap-3 w-full py-4 min-w-[700px]">

              {/* COL 1 – Population */}
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xs font-bold mb-2 bg-zinc-100 px-3 py-1 rounded-md border">Población</span>
                <div className="flex flex-col gap-1.5 border-2 border-zinc-800 rounded p-3 bg-white shadow-sm">
                  {pop.map((ind, i) => {
                    const isBest = (i === 1 || i === 2);
                    const isWorst = (i === 3 || i === 4);

                    // In step 4, highlight the new offspring that replaced the worst
                    const isNewOffspring = paso === 4 && isWorst;

                    let glowBorder = "border-zinc-400";
                    if (paso >= 1 && paso < 4 && isBest) glowBorder = "border-emerald-500";
                    if (paso >= 1 && paso < 4 && isWorst) glowBorder = "border-red-500";
                    if (isNewOffspring) glowBorder = "border-amber-500";

                    return (
                      <motion.div key={`p-${paso < 4 ? ind.id : ind.id + '-new'}`} layout transition={{ duration: 0.5 }} className="relative">
                        <Chromo
                          segs={ind.segments}
                          glow={glowBorder}
                          dim={paso >= 1 && paso < 4 && !isBest && !isWorst}
                        />
                        {/* Labels a la izquierda */}
                        {paso >= 1 && paso < 4 && isBest && (
                          <motion.span
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute -left-16 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 whitespace-nowrap"
                          >Mejor</motion.span>
                        )}
                        {paso >= 1 && paso < 4 && isWorst && (
                          <motion.span
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute -left-14 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800 whitespace-nowrap"
                          >Peor</motion.span>
                        )}
                        {isNewOffspring && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -left-16 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 whitespace-nowrap"
                          >¡Nuevo!</motion.span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ARROW 1 + label (always visible once activated) */}
              <div className="flex flex-col items-center mt-16 shrink-0">
                <Arrow active={paso >= 2} />
                <span className={`text-[11px] font-semibold mt-1 transition-opacity duration-500 ${paso >= 2 ? "text-zinc-700 opacity-100" : "text-zinc-400 opacity-30"}`}>
                  Selección
                </span>
              </div>

              {/* COL 2 – Selected parents (persist from step 2 onward) */}
              <div className="flex flex-col items-center shrink-0 mt-8">
                <div className="min-h-[130px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {paso >= 2 && (
                      <motion.div
                        key="parents"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mb-1">Padres Seleccionados</span>
                        <Chromo segs={initPop[1].segments} glow="border-emerald-500" />
                        <Chromo segs={initPop[2].segments} glow="border-emerald-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ARROW 2 + label (always visible once activated) */}
              <div className="flex flex-col items-center mt-16 shrink-0">
                <Arrow active={paso >= 3} />
                <span className={`text-[11px] font-semibold mt-1 text-center leading-tight transition-opacity duration-500 ${paso >= 3 ? "text-zinc-700 opacity-100" : "text-zinc-400 opacity-30"}`}>
                  Cruce y<br/>Mutación
                </span>
              </div>

              {/* COL 3 – Offspring (persist from step 3 onward) */}
              <div className="flex flex-col items-center shrink-0 mt-8">
                <div className="min-h-[130px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {paso >= 3 && (
                      <motion.div
                        key="offspring"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded mb-1">Descendencia</span>
                        <div className="relative">
                          <div className="absolute left-1/2 -top-1 -bottom-1 border-l-2 border-dashed border-violet-400 z-10" />
                          <div className="flex flex-col gap-1.5">
                            <Chromo segs={offspringData[0].segments} glow="border-violet-500" />
                            <Chromo segs={offspringData[1].segments} glow="border-violet-500" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* ─── Return arrow (step 4) ─── */}
            <AnimatePresence>
              {paso === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center gap-3 py-3"
                >
                  {/* Flecha curva ← */}
                  <motion.svg 
                    width="100%" 
                    height="56" 
                    viewBox="0 0 700 56" 
                    fill="none" 
                    className="w-full max-w-[700px]"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Path: desde la derecha (descendencia), baja, cruza horizontal, sube a la izquierda (población) */}
                    <motion.path
                      d="M600,4 L600,42 Q600,50 592,50 L108,50 Q100,50 100,42 L100,4"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    {/* Punta de flecha izquierda (arriba) */}
                    <motion.polygon
                      points="92,12 100,0 108,12"
                      fill="#d97706"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    />
                    {/* Label sobre la línea horizontal */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <rect x="210" y="38" width="280" height="20" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
                      <text x="350" y="52" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600" fontFamily="Manrope, sans-serif">
                        Reinsertar descendencia, reemplazando peores
                      </text>
                    </motion.g>
                  </motion.svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Step text + button ─── */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md mt-2">
            <Boton
              onClick={iniciar}
              disabled={paso > 0 && paso < 4}
              variante="primario"
              className="w-full font-bold shadow-md"
            >
              {paso > 0 && paso < 4 ? "Procesando..." : paso === 4 ? "Reiniciar Simulación" : "Iniciar Estado de Equilibrio"}
            </Boton>

            <motion.p
              key={paso}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-medium text-center min-h-[40px] ${stepTexts[paso].color}`}
            >
              {stepTexts[paso].text}
            </motion.p>
          </div>

        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
