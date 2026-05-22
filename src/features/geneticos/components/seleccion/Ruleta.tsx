import { useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { individuosDeEjemplo as individuos } from "@/features/geneticos/lib/datos";
import { ejecutarSeleccionRuleta } from "@/features/geneticos/lib/seleccion";

const totalFitness = individuos.reduce((acc, ind) => acc + ind.fitness, 0);

export function Ruleta() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const girar = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedId(null);
    setRandomNumber(null);

    const resultado = ejecutarSeleccionRuleta(individuos, rotation);
    setRotation(resultado.nuevaRotacion);

    setTimeout(() => {
      setIsSpinning(false);
      setRandomNumber(resultado.numeroAleatorio);
      setSelectedId(resultado.ganador.id);
    }, 3500);
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Selección por Ruleta</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Proporcional</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">
          La probabilidad de selección es proporcional al fitness absoluto de cada individuo.
        </DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/20 p-6 rounded-xl border flex flex-col items-center gap-8 mt-4">
          <div className="flex flex-col xl:flex-row items-center gap-8 w-full justify-center">
            <div className="bg-background border rounded-lg overflow-hidden shadow-sm text-sm">
              <table className="min-w-[220px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Población</th>
                    <th className="px-4 py-2 text-right font-semibold">Aptitud</th>
                    <th className="px-4 py-2 text-right font-semibold">Prob.</th>
                  </tr>
                </thead>
                <tbody>
                  {individuos.map((ind) => (
                    <tr key={ind.id} className={`border-t transition-colors ${selectedId === ind.id ? "bg-blue-50/80 font-bold" : ""}`}>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ind.color }} />
                        {ind.nombre}
                      </td>
                      <td className="px-4 py-2 text-right">{ind.fitness}</td>
                      <td className="px-4 py-2 text-right">{(((ind.fitness / totalFitness) * 100)).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hidden xl:flex flex-col items-center justify-center gap-2">
              <ArrowRight className="text-muted-foreground/50" size={32} />
            </div>
            <div className="flex xl:hidden flex-col items-center justify-center gap-2">
              <ArrowDown className="text-muted-foreground/50" size={32} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 bg-background p-6 rounded-xl border shadow-sm">
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-4 z-10 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-black drop-shadow-md" />
                <motion.div
                  className="w-48 h-48 rounded-full border-4 border-background shadow-[0_0_15px_rgba(0,0,0,0.1)] shrink-0"
                  style={{ background: "conic-gradient(#64748b 0% 13.5%, #3b82f6 13.5% 37.8%, #eab308 37.8% 43.2%, #22c55e 43.2% 90.1%, #ef4444 90.1% 100%)" }}
                  animate={{ rotate: rotation }}
                  transition={{ duration: 3.5, ease: [0.15, 0.8, 0.1, 1] }}
                />
                <Boton onClick={girar} disabled={isSpinning} variante="primario" className="mt-6 font-bold w-full shadow-md">
                  {isSpinning ? "Girando..." : "Girar Ruleta"}
                </Boton>
              </div>

              <div className="flex flex-col min-w-[180px] gap-6">
                <div className="flex flex-col gap-2 text-xs font-medium">
                  {individuos.map((ind) => (
                    <div key={ind.id} className={`flex items-center justify-between p-1.5 rounded transition-all ${selectedId === ind.id ? "bg-blue-50 ring-1 ring-blue-500 shadow-sm transform scale-105" : ""}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm shadow-sm" style={{ backgroundColor: ind.color }} />
                        <span className={selectedId === ind.id ? "font-bold text-blue-700" : ""}>{ind.nombre}</span>
                      </div>
                      <span className={selectedId === ind.id ? "font-bold text-blue-700" : "text-muted-foreground"}>{(((ind.fitness / totalFitness) * 100)).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="flex items-center gap-4 h-12">
              {randomNumber !== null && selectedId !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="bg-background border px-4 py-2 rounded-md shadow-sm font-medium">
                    Número aleatorio = <span className="font-bold text-lg">{randomNumber}</span>
                  </div>
                  <ArrowRight className="text-muted-foreground hidden sm:block" size={24} />
                  <ArrowDown className="text-muted-foreground sm:hidden" size={24} />
                  <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-md shadow-sm font-bold text-lg">
                    El {individuos.find((i) => i.id === selectedId)?.nombre} es seleccionado
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
