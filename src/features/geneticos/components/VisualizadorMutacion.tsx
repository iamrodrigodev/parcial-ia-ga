import { useState } from "react";
import { Boton } from "@/components/ui/boton";
import { MutacionBitFlip } from "@/features/geneticos/components/mutacion/MutacionBitFlip";
import { MutacionIntercambio } from "@/features/geneticos/components/mutacion/MutacionIntercambio";
import { MutacionInversion } from "@/features/geneticos/components/mutacion/MutacionInversion";

const tiposMutacion = [
  { id: "bit-flip", nombre: "Bit Flip" },
  { id: "intercambio", nombre: "Intercambio" },
  { id: "inversion", nombre: "Inversión" }
];

export function VisualizadorMutacion() {
  const [activo, setActivo] = useState("bit-flip");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0 border-r pr-4 pb-4">
        <h3 className="font-semibold text-lg mb-2 px-4">Métodos</h3>
        {tiposMutacion.map((tipo) => (
          <Boton
            key={tipo.id}
            onClick={() => setActivo(tipo.id)}
            variante={activo === tipo.id ? "primario" : "fantasma"}
            className={`w-full justify-start text-left ${activo === tipo.id ? "" : "text-muted-foreground"}`}
          >
            {tipo.nombre}
          </Boton>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        {activo === "bit-flip" && <MutacionBitFlip />}
        {activo === "intercambio" && <MutacionIntercambio />}
        {activo === "inversion" && <MutacionInversion />}
      </div>
    </div>
  );
}
