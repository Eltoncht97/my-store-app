// export const myGetter = ( state ) => {
// return state.something
// }

export const getOrdenesDeCompra = (state) => {
  return state.ordenesDeCompra;
};

export const getOrdenDeCompra = (state) => {
  return state.ordenDeCompra;
};

export const getInformeData = (state) => {
  return state.informeCompras;
};

export const getTotalComprasInforme = (state) => {
  return state.informeCompras.compras.reduce(
    (total, compra) => total + compra.total,
    0
  );
};
