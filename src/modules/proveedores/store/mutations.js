// export const myAction = ( state, payload ) => {}

export const setProveedores = (state, { proveedores, count }) => {
  state.proveedores = proveedores;
  state.pagination.totalProveedores = count;
};

export const setProveedor = (state, payload) => {
  state.proveedor = payload;
};

export const resetProveedor = (state) => {
  state.proveedor = {
    name: "",
    cuil: "",
    address: "",
    phone: "",
  };
};
