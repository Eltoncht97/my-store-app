// export const myAction = ( state, payload ) => {}

export const setOrdenesDeCompra = (state, payload) => {
  state.ordenesDeCompra = payload;
};

export const setOrdenDeIngreso = (state, payload) => {
  state.ordenDeCompra = payload
}

export const setInformeCompras = (state, payload) => {
  state.informeCompras.categories = {
    labels: payload.categories.map(c => c.name),
    counts: payload.categories.map(c => c.count),
  };
  state.informeCompras.compras = payload.compras;
};