export function limpiarRut(rut: string): string { return rut.replace(/[^0-9kK]/g,"").toUpperCase(); }
export function formatearRut(rut: string): string {
  const l = limpiarRut(rut);
  if (l.length <= 1) return l;
  const cuerpo = l.slice(0,-1), dv = l.slice(-1);
  return `${parseInt(cuerpo).toLocaleString("es-CL")}-${dv}`;
}
export function validarRut(rut: string): boolean {
  const l = limpiarRut(rut);
  if (l.length < 2) return false;
  const cuerpo = l.slice(0,-1), dv = l.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0, mult = 2;
  for (let i = cuerpo.length-1; i >= 0; i--) { suma += parseInt(cuerpo[i])*mult; mult = mult===7?2:mult+1; }
  const resto = 11-(suma%11);
  const expected = resto===11?"0":resto===10?"K":resto.toString();
  return dv===expected;
}
