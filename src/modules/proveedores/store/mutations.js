// export const myAction = ( state, payload ) => {}

export const setProveedores = (state, proveedores) => {
  state.proveedores = proveedores;
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
