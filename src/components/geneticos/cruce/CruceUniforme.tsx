import { useMemo, useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Insignia } from "@/components/ui/insignia";
import { Boton } from "@/components/ui/boton";

const p1 = [1, 0, 1, 0, 1, 0];
const p2 = [0, 1, 0, 1, 0, 1];

function Gene({ value, className = "" }: { value: number | string; className?: string }) {
  return <div className={`w-9 h-9 border rounded-sm flex items-center justify-center text-white font-bold ${className}`}>{value}</div>;
}

export function CruceUniforme() {
  const [mask, setMask] = useState<number[]>([1, 1, 0, 1, 0, 0]);
  const [lastMask, setLastMask] = useState<number[] | null>(null);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const hijo = useMemo(() => mask.map((m, i) => (m ? p1[i] : p2[i])), [mask]);
  const nueva = () => {
    setLastMask(mask);
    setMask(p1.map(() => (Math.random() > 0.5 ? 1 : 0)));
    setPaso(1);
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Cruce Uniforme</TituloTarjeta>
          <Insignia className="bg-black text-white hover:bg-black/90 border-transparent px-3 py-1 text-sm font-semibold">Alta mezcla</Insignia>
        </div>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3: cada gen usa máscara (1 = Padre 1, 0 = Padre 2).</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <Boton variante={paso === 1 ? "primario" : "fantasma"} onClick={() => setPaso(1)}>1. Ver padres</Boton>
              <Boton variante={paso === 2 ? "primario" : "fantasma"} onClick={() => setPaso(2)}>2. Aplicar máscara</Boton>
              <Boton variante={paso === 3 ? "primario" : "fantasma"} onClick={() => setPaso(3)}>3. Resultado</Boton>
            </div>
            <Boton onClick={nueva}>Nueva máscara</Boton>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Padre 1:</span><div className="flex gap-1">{p1.map((v, i) => <Gene key={`p1-${i}`} value={v} className="bg-blue-500" />)}</div></div>
          <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Padre 2:</span><div className="flex gap-1">{p2.map((v, i) => <Gene key={`p2-${i}`} value={v} className="bg-green-500" />)}</div></div>

          {paso >= 2 && <div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right text-muted-foreground">Máscara:</span><div className="flex gap-1">{mask.map((m, i) => <Gene key={`m-${i}`} value={m ? "P1" : "P2"} className={m ? "bg-blue-400" : "bg-green-400"} />)}</div></div>}

          {paso >= 3 && <><div className="w-full max-w-[340px] h-0.5 bg-zinc-300" /><div className="flex flex-col md:flex-row items-center gap-3"><span className="w-24 text-sm font-bold text-center md:text-right">Hijo:</span><div className="flex gap-1">{hijo.map((v, i) => <Gene key={`h-${i}`} value={v} className={mask[i] ? "bg-blue-500" : "bg-green-500"} />)}</div></div></>}

          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700"><strong>Conclusión:</strong> la máscara define gen por gen el origen del hijo. {lastMask ? "Nueva máscara activa y resultado actualizado." : "Pulsa Nueva máscara para ver otro patrón."}</div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
