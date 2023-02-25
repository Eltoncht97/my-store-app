// export const myGetter = ( state ) => {
// return state.something
// }
export const getCajas = (state) => {
  return state.cajasFiltered;
};

export const getCaja = (state) => {
  return state.caja;
};

export const getInformeData = (state) => {
  return state.informeCaja;
};

export const getTotalMovimientos = (state) => {
  return state.caja.movimientos
    .map((m) => m.monto)
    .reduce((prev, curr) => prev + curr, 0);
};
