import { useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Boton } from "@/components/ui/boton";

const base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function MutacionScramble() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(6);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);

  const bloque = base.slice(a, b + 1);
  const bloqueMezclado = mezclar(bloque);
  const mut = [...base.slice(0, a), ...bloqueMezclado, ...base.slice(b + 1)];

  const nuevo = () => {
    const i = Math.floor(Math.random() * (base.length - 2));
    const j = Math.floor(Math.random() * (base.length - i - 1)) + i + 1;
    setA(i);
    setB(j);
    setPaso(1);
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación Scramble</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3. Se selecciona un bloque y se reordena aleatoriamente sin cambiar genes fuera del bloque.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Boton variante={paso === 1 ? "primario" : "fantasma"} onClick={() => setPaso(1)}>1. Marcar bloque</Boton>
            <Boton variante={paso === 2 ? "primario" : "fantasma"} onClick={() => setPaso(2)}>2. Mezclar bloque</Boton>
            <Boton variante={paso === 3 ? "primario" : "fantasma"} onClick={() => setPaso(3)}>3. Resultado</Boton>
            <Boton onClick={nuevo}>Nuevo ejemplo</Boton>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-24 text-sm font-bold text-center md:text-right">Antes:</span>
            <div className="flex gap-1">
              {base.map((v, i) => (
                <div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i >= a && i <= b ? "border-red-500 bg-red-50 text-red-700" : "bg-white"}`}>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {paso >= 2 && (
            <div className="text-sm text-zinc-600">
              Bloque seleccionado: de <strong>{a + 1}</strong> a <strong>{b + 1}</strong>. Se reordena internamente.
            </div>
          )}

          {paso >= 3 && (
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-24 text-sm font-bold text-center md:text-right">Después:</span>
              <div className="flex gap-1">
                {mut.map((v, i) => (
                  <div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i >= a && i <= b ? "border-green-500 bg-green-50 text-green-700" : "bg-white"}`}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700">
            <strong>Conclusión:</strong> Scramble mantiene los mismos genes en el bloque, pero altera su orden para aumentar diversidad local.
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
