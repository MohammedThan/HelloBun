export function preventNaN(x: number | string | undefined) {
  if (x === undefined || x === null || isNaN(x as any)) {
    return 0;
  }
  return Number(x);
}
