import { useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { individuosDeEjemplo as individuos } from "@/features/geneticos/lib/datos";
import { ejecutarSeleccionRuleta } from "@/features/geneticos/lib/seleccion";

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
        <DescripcionTarjeta className="text-base mt-2">La probabilidad de selección es proporcional a la aptitud.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/20 p-6 rounded-xl border flex flex-col items-center gap-8 mt-4">
          <div className="flex flex-col xl:flex-row items-center gap-8 w-full justify-center">
            <div className="bg-background border rounded-lg overflow-hidden shadow-sm text-sm">
              <table className="min-w-[200px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Población</th>
                    <th className="px-4 py-2 text-right font-semibold">Aptitud</th>
                  </tr>
                </thead>
                <tbody>
                  {individuos.map((ind) => (
                    <tr key={ind.id} className={`border-t transition-colors ${selectedId === ind.id ? "bg-blue-50/80 font-bold" : ""}`}>
                      <td className="px-4 py-2">{ind.nombre}</td>
                      <td className="px-4 py-2 text-right">{ind.fitness}</td>
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
            <div className="flex flex-col items-center gap-4 bg-background p-6 rounded-xl border shadow-sm">
              <motion.div
                className="w-48 h-48 rounded-full border-4 border-background shadow-[0_0_15px_rgba(0,0,0,0.1)] shrink-0"
                style={{ background: "conic-gradient(#64748b 0% 13.5%, #3b82f6 13.5% 37.8%, #eab308 37.8% 43.2%, #22c55e 43.2% 90.1%, #ef4444 90.1% 100%)" }}
                animate={{ rotate: rotation }}
                transition={{ duration: 3.5, ease: [0.15, 0.8, 0.1, 1] }}
              />
              <Boton onClick={girar} disabled={isSpinning} variante="primario">
                {isSpinning ? "Girando..." : "Girar Ruleta"}
              </Boton>
            </div>
          </div>
          {randomNumber !== null && (
            <p className="text-sm text-muted-foreground">
              Número aleatorio: <strong>{randomNumber}</strong>
            </p>
          )}
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
