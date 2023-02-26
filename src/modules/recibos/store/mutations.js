// export const myAction = ( state, payload ) => {}

export const setRecibos = (state, recibos) => {
  state.recibos = recibos;
  state.recibosFiltered = recibos;
};

export const filterRecibos = (state, filterTxt) => {
  state.recibosFiltered = state.recibos.filter(
    (recibo) =>
      recibo.client.name.toLowerCase().includes(filterTxt) ||
      recibo.client.lastname.toLowerCase().includes(filterTxt)
  );
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
}