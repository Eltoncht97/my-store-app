// export const myGetter = ( state ) => {
// return state.something
// }

export const getProveedores = (state) => state.proveedores.map(proveedor => ({...proveedor, label: `${proveedor.name} - $${proveedor.account.saldo}`}));

export const getTotalProveedores = (state) => state.pagination.totalProveedores;

export const getProveedor = (state) => state.proveedor;
