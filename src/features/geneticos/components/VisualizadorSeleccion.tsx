import { useState } from "react";
import { Boton } from "@/components/ui/boton";
import { Ruleta } from "@/features/geneticos/components/seleccion/Ruleta";
import { Ranking } from "@/features/geneticos/components/seleccion/Ranking";
import { Torneo } from "@/features/geneticos/components/seleccion/Torneo";
import { SteadyState } from "@/features/geneticos/components/seleccion/SteadyState";
import { Elitismo } from "@/features/geneticos/components/seleccion/Elitismo";

const tiposSeleccion = [
  { id: "ruleta", nombre: "Ruleta" },
  { id: "ranking", nombre: "Ranking" },
  { id: "torneo", nombre: "Torneo" },
  { id: "steady", nombre: "Estado de Equilibrio" },
  { id: "elitismo", nombre: "Elitismo" }
];

export function VisualizadorSeleccion() {
  const [activo, setActivo] = useState("ruleta");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0 border-r pr-4 pb-4">
        <h3 className="font-semibold text-lg mb-2 px-4">Métodos</h3>
        {tiposSeleccion.map((tipo) => (
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
        {activo === "ruleta" && <Ruleta />}
        {activo === "ranking" && <Ranking />}
        {activo === "torneo" && <Torneo />}
        {activo === "steady" && <SteadyState />}
        {activo === "elitismo" && <Elitismo />}
      </div>
    </div>
  );
}
