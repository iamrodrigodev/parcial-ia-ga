import type { IndividuoLaberinto } from "@/features/laberinto/lib/tipos";

export function seleccionTorneo(poblacion: IndividuoLaberinto[], tamanoTorneo: number): IndividuoLaberinto {
  const concursantes: IndividuoLaberinto[] = [];
  const n = poblacion.length;

  for (let i = 0; i < tamanoTorneo; i++) {
    const indiceAzar = Math.floor(Math.random() * n);
    concursantes.push(poblacion[indiceAzar]);
  }

  let campeon = concursantes[0];
  for (let i = 1; i < concursantes.length; i++) {
    if (concursantes[i].fitness > campeon.fitness) {
      campeon = concursantes[i];
    }
  }

  return campeon;
}
