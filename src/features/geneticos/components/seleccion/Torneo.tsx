import { useState, useEffect } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { individuosDeEjemplo } from "@/features/geneticos/lib/datos";
import { ejecutarSeleccionTorneo, ResultadoTorneo } from "@/features/geneticos/lib/seleccion";

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
    const res = ejecutarSeleccionTorneo(poblacionTorneo, 3);
    setResultado(res);
    setPaso(1);
  };

  useEffect(() => {
    if (paso === 1) {
      const t = setTimeout(() => setPaso(2), 1500);
      return () => clearTimeout(t);
    }
    if (paso === 2) {
      const t = setTimeout(() => setPaso(3), 2000);
      return () => clearTimeout(t);
    }
  }, [paso]);

  const esConcursante = (id: number) => resultado?.concursantes.some((c) => c.id === id);
  const esCampeon = (id: number) => resultado?.campeon.id === id;
  const podio = resultado ? [...resultado.concursantes].sort((a, b) => b.fitness - a.fitness).slice(0, 3) : [];
  const primer = podio[0];
  const segundo = podio[1];
  const tercero = podio[2];

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Seleccion por Torneo</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Competitiva</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          Se elige al azar un grupo de <strong>K</strong> individuos de la poblacion y se enfrentan entre si. El que tiene mayor fitness del grupo, gana y es seleccionado.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/10 p-6 rounded-xl border flex flex-col items-center gap-6">
          <div className="flex flex-col xl:flex-row items-center justify-between w-full max-w-4xl gap-8 overflow-x-auto pb-4">
            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-muted px-3 py-1 rounded-md">Poblacion (N={poblacionTorneo.length})</span>
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
                      animate={{ scale: highlight ? 1.2 : 1, opacity: dim ? 0.3 : 1, boxShadow: highlight ? `0 0 15px ${ind.color}` : "none" }}
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-black/20"
                      style={{ backgroundColor: ind.color, x, y }}
                    >
                      f={ind.fitness}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <ArrowRight className={`text-muted-foreground transition-opacity ${paso >= 1 ? "opacity-100" : "opacity-20"}`} size={32} />

            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-md">Arena (K=3)</span>
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-amber-500/50 bg-amber-50 relative flex items-center justify-center shadow-inner">
                <AnimatePresence>
                  {paso >= 2 &&
                    resultado?.concursantes.map((ind, i) => {
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
                          animate={{ scale: paso === 3 && isWinner ? 1.2 : 1, opacity: dim ? 0.3 : 1, x, y }}
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

            <div className="flex flex-col items-center shrink-0">
              <span className="font-semibold mb-4 bg-green-100 text-green-800 px-3 py-1 rounded-md">Ganadores</span>
              <div className="flex items-end h-36 gap-1 border-b-4 border-border pb-1 px-4 relative">
                <div className="flex flex-col items-center z-10">
                  <AnimatePresence>
                    {paso === 3 && segundo && (
                      <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-xl mb-2"
                        style={{ backgroundColor: segundo.color }}
                      >
                        f={segundo.fitness}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="w-14 h-14 bg-gradient-to-t from-zinc-200 to-zinc-100 border-t-4 border-zinc-400 flex items-center justify-center font-bold text-zinc-700 rounded-t-md shadow-inner">2°</div>
                </div>

                <div className="flex flex-col items-center z-10">
                  <AnimatePresence>
                    {paso === 3 && primer && (
                      <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1.2 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white shadow-xl mb-2"
                        style={{ backgroundColor: primer.color }}
                      >
                        f={primer.fitness}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="w-16 h-20 bg-gradient-to-t from-amber-200 to-amber-100 border-t-4 border-amber-400 flex items-center justify-center font-bold text-amber-800 rounded-t-md shadow-inner">1°</div>
                </div>

                <div className="flex flex-col items-center z-10">
                  <AnimatePresence>
                    {paso === 3 && tercero && (
                      <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-xl mb-2"
                        style={{ backgroundColor: tercero.color }}
                      >
                        f={tercero.fitness}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="w-14 h-11 bg-gradient-to-t from-orange-200 to-orange-100 border-t-4 border-orange-400 flex items-center justify-center font-bold text-orange-800 rounded-t-md shadow-inner">3°</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-md mt-4">
            <Boton onClick={iniciarTorneo} disabled={paso === 1 || paso === 2} variante="primario" className="w-full font-bold shadow-md">
              {paso === 1 || paso === 2 ? "Simulando..." : "Realizar Torneo (K=3)"}
            </Boton>

            <div className="h-10 flex items-center justify-center text-center">
              {paso === 0 && <p className="text-sm text-muted-foreground">Inicia el torneo para elegir 3 combatientes aleatorios.</p>}
              {paso === 1 && <p className="text-sm text-blue-600 font-medium animate-pulse">Seleccionando 3 individuos al azar de la poblacion...</p>}
              {paso === 2 && <p className="text-sm text-amber-600 font-medium animate-pulse">Los combatientes se enfrentan. El mayor fitness ganara.</p>}
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
