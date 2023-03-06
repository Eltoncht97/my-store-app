// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getProveedores = async ({ commit }, params) => {
  const { filterTxt = "", filterSaldo, limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/proveedores?limit=${limit}&offset=${offset}&keyword=${filterTxt}&${
        filterSaldo === "saldo" && "saldo=true"
      }`
    );

    if (!response.data) {
      commit("setProveedores", []);
      return { ok: false, message: "Hubo un error al cargar los proveedores" };
    }

    commit("setProveedores", response.data.proveedores);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los proveedores" };
  }
};

export const getProveedor = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/proveedores/${id}`);

    if (!response.data) {
      commit("setProveedor", null);
      return {
        ok: false,
        message: "Hubo un error al traer los datos del proveedor",
      };
    }

    commit("setProveedor", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al taer los datos del proveedor",
    };
  }
};

export const createProveedor = async (_, data) => {
  try {
    const response = await pukisApi.post(`/proveedores`, data);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al crear al proveedor" };
    }

    return { ok: true, message: "Proveedor creado exitosamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear al proveedor" };
  }
};

export const updateProveedor = async (_, data) => {
  const { id, ...dataToUpdate } = data;
  try {
    const response = await pukisApi.patch(`/proveedores/${id}`, dataToUpdate);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al actualizar al proveedor" };
    }

    return { ok: true, message: "El proveedor a sido actualizado" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar al proveedor" };
  }
};

export const deleteProveedor = async (_, id) => {
  try {
    await pukisApi.delete(`/proveedores/${id}`);

    return { ok: true, message: "El proveedor a sido eliminado" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar al proveedor" };
  }
};
