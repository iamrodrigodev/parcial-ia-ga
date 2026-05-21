import { useMemo, useState } from "react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Boton } from "@/components/ui/boton";

const p1 = [1, 1, 0, 1, 0, 1, 0, 1];
const p2 = [0, 0, 1, 0, 1, 0, 1, 0];

function Gene({ value, className = "" }: { value: number | string; className?: string }) {
  return <div className={`w-9 h-9 border rounded-sm flex items-center justify-center text-white font-bold ${className}`}>{value}</div>;
}

export function CruceDosPuntos() {
  const [puntos, setPuntos] = useState<[number, number]>([2, 6]);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [a, b] = puntos;
  const h1 = useMemo(() => [...p1.slice(0, a), ...p2.slice(a, b), ...p1.slice(b)], [a, b]);
  const h2 = useMemo(() => [...p2.slice(0, a), ...p1.slice(a, b), ...p2.slice(b)], [a, b]);

  const nuevo = () => {
    const x = Math.floor(Math.random() * (p1.length - 2)) + 1;
    const y = Math.floor(Math.random() * (p1.length - x - 1)) + x + 1;
    setPuntos([x, y]);
    setPaso(1);
  };

  return (
    <Tarjeta>
      <EncabezadoTarjeta>
        <div className="flex items-center justify-between">
          <TituloTarjeta className="text-2xl">Cruce de Dos Puntos</TituloTarjeta>
          <Boton onClick={nuevo}>Nuevo ejemplo</Boton>
        </div>
        <DescripcionTarjeta className="text-base mt-2">Paso {paso}/3: cortes en <strong>{a}</strong> y <strong>{b}</strong>.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta>
        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Boton variante={paso === 1 ? "primario" : "fantasma"} onClick={() => setPaso(1)}>1. Marcar segmento</Boton>
            <Boton variante={paso === 2 ? "primario" : "fantasma"} onClick={() => setPaso(2)}>2. Intercambiar</Boton>
            <Boton variante={paso === 3 ? "primario" : "fantasma"} onClick={() => setPaso(3)}>3. Resultado</Boton>
          </div>
          {[{ label: "Padre 1", arr: p1, c: "bg-blue-500" }, { label: "Padre 2", arr: p2, c: "bg-green-500" }].map((r) => (
            <div key={r.label} className="flex flex-col md:flex-row items-center gap-3">
              <span className="w-24 text-sm font-bold text-center md:text-right">{r.label}:</span>
              <div className="flex gap-1">{r.arr.map((v, i) => <Gene key={`${r.label}-${i}`} value={v} className={`${r.c} ${i >= a && i < b ? "ring-2 ring-amber-300" : ""}`} />)}</div>
            </div>
          ))}
          {paso >= 2 && (
            <>
              <div className="w-full max-w-[430px] h-0.5 bg-zinc-300" />
              {[{ label: "Hijo 1", arr: h1 }, { label: "Hijo 2", arr: h2 }].map((r) => (
                <div key={r.label} className="flex flex-col md:flex-row items-center gap-3">
                  <span className="w-24 text-sm font-bold text-center md:text-right">{r.label}:</span>
                  <div className="flex gap-1">{r.arr.map((v, i) => <Gene key={`${r.label}-${i}`} value={paso === 2 ? (i >= a && i < b ? "swap" : "keep") : v} className={(i >= a && i < b) ? (r.label === "Hijo 1" ? "bg-green-500" : "bg-blue-500") : (r.label === "Hijo 1" ? "bg-blue-500" : "bg-green-500")} />)}</div>
                </div>
              ))}
            </>
          )}
          <div className="w-full rounded-md border bg-white p-3 text-sm text-zinc-700"><strong>Conclusión:</strong> solo el segmento entre dos cortes se intercambia; los extremos se conservan.</div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
