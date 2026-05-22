import { useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Boton } from "@/components/ui/boton";

const base = ["A","B","C","D","E"];

export function MutacionIntercambio() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(3);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const mut = [...base];
  [mut[a], mut[b]] = [mut[b], mut[a]];

  const nuevo = () => {
    const i = Math.floor(Math.random()*base.length);
    let j = Math.floor(Math.random()*base.length);
    while (j===i) j = Math.floor(Math.random()*base.length);
    setA(Math.min(i,j)); setB(Math.max(i,j)); setPaso(1);
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación por Intercambio</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3. Se eligen dos posiciones y se permutan.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Boton variante={paso===1?"primario":"fantasma"} onClick={()=>setPaso(1)}>1. Elegir posiciones</Boton>
            <Boton variante={paso===2?"primario":"fantasma"} onClick={()=>setPaso(2)}>2. Intercambiar</Boton>
            <Boton variante={paso===3?"primario":"fantasma"} onClick={()=>setPaso(3)}>3. Resultado</Boton>
            <Boton onClick={nuevo}>Nuevo ejemplo</Boton>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Antes:</span><div className="flex gap-1">{base.map((v,i)=><div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i===a?"border-blue-500 bg-blue-50 text-blue-700": i===b?"border-amber-500 bg-amber-50 text-amber-700":"bg-white"}`}>{v}</div>)}</div></div>

          {paso>=2 && <div className="text-sm text-zinc-600">Se intercambian posiciones <strong>{a+1}</strong> y <strong>{b+1}</strong>.</div>}

          {paso>=3 && <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Después:</span><div className="flex gap-1">{mut.map((v,i)=><div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i===a||i===b?"border-green-500 bg-green-50 text-green-700":"bg-white"}`}>{v}</div>)}</div></div>}

          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700"><strong>Conclusión:</strong> Intercambio conserva todos los genes y solo altera su orden.</div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
