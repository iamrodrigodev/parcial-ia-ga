function generarGenAleatorioDistinto(actual: number): number {
  let nuevo = actual;
  while (nuevo === actual) {
    nuevo = Math.floor(Math.random() * 5);
  }
  return nuevo;
}

export function mutacionAleatoria(cromosoma: number[], tasaMutacion: number, prefijoProtegido = 0): number[] {
  const mutado = [...cromosoma];

  for (let i = prefijoProtegido; i < mutado.length; i++) {
    if (Math.random() < tasaMutacion) {
      mutado[i] = generarGenAleatorioDistinto(mutado[i]);
    }
  }

  return mutado;
}
