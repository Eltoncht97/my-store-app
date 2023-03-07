// export const myAction = ( state, payload ) => {}

export const setPagos = (state, pagos) => {
  state.pagos = pagos;
};

export const setPago = (state, pago) => {
  state.pago = pago;
};

export const resetPago = (state) => {
  state.pago = {
    proveedor: "",
    paymentMethod: "",
    total: null,
  };
};

export const resetModulo = (state) => {
  state.pagos = [];
  state.pago = null;
};
