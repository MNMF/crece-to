// Limpia el RUT dejando solo números y K mayúscula
export function limpiarRut(rut: string): string {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
}

// Formatea el RUT como 12.345.678-9
export function formatearRut(rut: string): string {
  const limpio = limpiarRut(rut);
  if (limpio.length <= 1) return limpio;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  const cuerpoFormateado = parseInt(cuerpo).toLocaleString("es-CL");
  return `${cuerpoFormateado}-${dv}`;
}

// Valida el RUT usando el algoritmo módulo 11 chileno
export function validarRut(rut: string): boolean {
  const limpio = limpiarRut(rut);
  if (limpio.length < 2) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado: string;

  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = resto.toString();

  return dv === dvEsperado;
}
