export function mutacionCiclica(cromosoma: number[], tasaMutacion: number): number[] {
  return cromosoma.map((gen) => {
    if (Math.random() < tasaMutacion) return (gen + 1) % 5;
    return gen;
  });
}
