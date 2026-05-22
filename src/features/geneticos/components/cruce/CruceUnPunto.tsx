import { useMemo, useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Boton } from "@/components/ui/boton";

const p1 = [1, 1, 0, 0, 1, 1];
const p2 = [0, 0, 1, 1, 0, 0];

function Gene({ value, className = "" }: { value: number | string; className?: string }) {
  return <div className={`w-9 h-9 border rounded-sm flex items-center justify-center text-white font-bold ${className}`}>{value}</div>;
}

export function CruceUnPunto() {
  const [corte, setCorte] = useState(3);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const h1 = useMemo(() => [...p1.slice(0, corte), ...p2.slice(corte)], [corte]);
  const h2 = useMemo(() => [...p2.slice(0, corte), ...p1.slice(corte)], [corte]);

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Cruce de Un Punto</TituloTarjeta>
          <Boton onClick={() => { setCorte(Math.floor(Math.random() * (p1.length - 1)) + 1); setPaso(1); }}>Nuevo ejemplo</Boton>
        </div>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3: corte en gen <strong>{corte}</strong>.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Boton variante={paso === 1 ? "primario" : "fantasma"} onClick={() => setPaso(1)}>1. Marcar corte</Boton>
            <Boton variante={paso === 2 ? "primario" : "fantasma"} onClick={() => setPaso(2)}>2. Copiar segmentos</Boton>
            <Boton variante={paso === 3 ? "primario" : "fantasma"} onClick={() => setPaso(3)}>3. Resultado</Boton>
          </div>

          {[{ label: "Padre 1", arr: p1, c: "bg-blue-500" }, { label: "Padre 2", arr: p2, c: "bg-green-500" }].map((r) => (
            <div key={r.label} className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-24 text-sm font-bold text-center md:text-right">{r.label}:</span>
              <div className="flex gap-1 items-center">{r.arr.map((v, i) => <Gene key={`${r.label}-${i}`} value={v} className={`${r.c} ${i === corte ? "ml-2" : ""}`} />)}</div>
            </div>
          ))}

          {paso >= 2 && (
            <>
              <div className="w-full max-w-[380px] h-0.5 bg-zinc-300" />
              <div className="text-xs text-zinc-600">Hijo 1 toma izquierda de Padre 1 y derecha de Padre 2. Hijo 2 al revés.</div>
              {[{ label: "Hijo 1", arr: h1 }, { label: "Hijo 2", arr: h2 }].map((r) => (
                <div key={r.label} className="flex flex-col md:flex-row items-center gap-3">
                  <span className="w-24 text-sm font-bold text-center md:text-right">{r.label}:</span>
                  <div className="flex gap-1">
                    {r.arr.map((v, i) => <Gene key={`${r.label}-${i}`} value={paso === 2 ? (i < corte ? (r.label === "Hijo 1" ? "P1" : "P2") : (r.label === "Hijo 1" ? "P2" : "P1")) : v} className={i < corte ? (r.label === "Hijo 1" ? "bg-blue-500" : "bg-green-500") : (r.label === "Hijo 1" ? "bg-green-500" : "bg-blue-500")} />)}
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700"><strong>Conclusión:</strong> solo se intercambia la cola del cromosoma desde el punto de corte.</div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
