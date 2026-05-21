import { useState } from "react";
import { Boton } from "@/components/ui/boton";
import { CruceUnPunto } from "./cruce/CruceUnPunto";
import { CruceDosPuntos } from "./cruce/CruceDosPuntos";
import { CruceUniforme } from "./cruce/CruceUniforme";

const tiposCruce = [
  { id: "un-punto", nombre: "Cruce de Un Punto" },
  { id: "dos-puntos", nombre: "Cruce de Dos Puntos" },
  { id: "uniforme", nombre: "Cruce Uniforme" }
];

export function VisualizadorCruce() {
  const [activo, setActivo] = useState("un-punto");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0 border-r pr-4 pb-4">
        <h3 className="font-semibold text-lg mb-2 px-4">Métodos</h3>
        {tiposCruce.map((tipo) => (
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
        {activo === "un-punto" && <CruceUnPunto />}
        {activo === "dos-puntos" && <CruceDosPuntos />}
        {activo === "uniforme" && <CruceUniforme />}
      </div>
    </div>
  );
}
