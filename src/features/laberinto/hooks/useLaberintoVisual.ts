import { useMemo, useState } from "react";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";

export function useLaberintoVisual(mejorIndividuoGeneracion: IndividuoLaberinto | null) {
  const [pasoSimulacion, setPasoSimulacion] = useState(0);

  const maxPasosSimulacion = useMemo(
    () => (mejorIndividuoGeneracion ? Math.max(0, mejorIndividuoGeneracion.trayectoria.length - 1) : 0),
    [mejorIndividuoGeneracion]
  );

  const caminoDestacado = useMemo(
    () => (mejorIndividuoGeneracion ? mejorIndividuoGeneracion.trayectoria.slice(0, pasoSimulacion + 1) : []),
    [mejorIndividuoGeneracion, pasoSimulacion]
  );

  return {
    pasoSimulacion,
    setPasoSimulacion,
    maxPasosSimulacion,
    caminoDestacado,
  };
}
