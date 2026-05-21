import { useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Boton } from "@/components/ui/boton";

const base = [1, 0, 0, 1, 1, 0];

export function MutacionBitFlip() {
  const [idx, setIdx] = useState(2);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const mut = [...base];
  mut[idx] = mut[idx] === 1 ? 0 : 1;

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <TituloTarjeta className="text-2xl">Mutación Bit Flip</TituloTarjeta>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3. Se invierte un gen: de 0 a 1 o de 1 a 0.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Boton variante={paso===1?"primario":"fantasma"} onClick={()=>setPaso(1)}>1. Elegir gen</Boton>
            <Boton variante={paso===2?"primario":"fantasma"} onClick={()=>setPaso(2)}>2. Invertir</Boton>
            <Boton variante={paso===3?"primario":"fantasma"} onClick={()=>setPaso(3)}>3. Resultado</Boton>
            <Boton onClick={()=>{setIdx(Math.floor(Math.random()*base.length));setPaso(1);}}>Nuevo ejemplo</Boton>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="w-24 text-sm font-bold text-center md:text-right">Antes:</span>
            <div className="flex gap-1">{base.map((v,i)=><div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i===idx?"border-red-500 bg-red-50 text-red-700":"bg-white"}`}>{v}</div>)}</div>
          </div>

          {paso>=2 && <div className="text-sm text-zinc-600">Gen mutado en posición <strong>{idx+1}</strong></div>}

          {paso>=3 && <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Después:</span><div className="flex gap-1">{mut.map((v,i)=><div key={i} className={`w-10 h-10 border rounded-sm flex items-center justify-center font-bold ${i===idx?"border-green-500 bg-green-50 text-green-700":"bg-white"}`}>{v}</div>)}</div></div>}

          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700"><strong>Conclusión:</strong> Bit Flip introduce variación mínima y controlada, ideal en codificación binaria.</div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
