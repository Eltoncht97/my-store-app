// export const myAction = ( state, payload ) => {}

export const setRecibos = (state, recibos) => {
  state.recibos = recibos;
};

export const setRecibo = (state, recibo) => {
  state.recibo = recibo;
};

export const resetRecibo = (state) => {
  state.recibo = {
    client: "",
    paymentMethod: "",
    total: null,
  };
};

export const resetModulo = (state) => {
  state.recibos = [];
  state.recibo = null;
};
