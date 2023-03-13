// export const myAction = ( state, payload ) => {}
export const setCajas = (state, payload) => {
  state.cajas = payload;
};

export const setCaja = (state, payload) => {
  state.caja = payload;
};

export const setInformeCaja = (state, payload) => {
  state.informeCaja.movimientos = payload.movimientos;
  state.informeCaja.ventas = payload.ventas;
};

export const resetCaja = (state) => {
  state.caja = null;
};
