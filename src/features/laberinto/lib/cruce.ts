export function crossoverUnPunto(padreA: number[], padreB: number[]): number[] {
  const len = padreA.length;
  if (len <= 1) return [...padreA];

  const puntoCorte = Math.floor(Math.random() * (len - 1)) + 1;
  return [...padreA.slice(0, puntoCorte), ...padreB.slice(puntoCorte)];
}
