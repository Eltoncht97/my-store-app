// export const myGetter = ( state ) => {
// return state.something
// }
export const getCuenta = (state) => {
  return state.cuenta;
};
export const getTotalMovimientos = (state) => {
  return state.cuenta.movimientos
    .map((m) => m.monto)
    .reduce((prev, curr) => prev + curr, 0);
};
