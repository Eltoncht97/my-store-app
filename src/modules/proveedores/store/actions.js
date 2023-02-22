// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getProveedores = async ({ commit }, { keyword, page, saldo }) => {
  try {
    const response = await pukisApi.get(`/proveedores`, {
      params: {
        offset: (page - 1) * 10,
        limit: 10,
        keyword,
        saldo: saldo === "saldo" ? true : null,
      },
    });

    if (!response.data) {
      commit("setProveedores", []);
      return;
    }
    commit("setProveedores", response.data);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los proveedores" };
  }
};

export const getProveedor = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/proveedores/${id}`);
    if (!response.data) {
      return {
        ok: false,
        message: "Hubo un error al guardar los datos del proveedor",
      };
    }

    commit("setProveedor", response.data);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al guardar los datos del proveedor",
    };
  }
};

export const createProveedor = async (_, data) => {
  try {
    const response = await pukisApi.post(`/proveedores`, data);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al crear al proveedores" };
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear al proveedores" };
  }
};

export const updateProveedor = async (_, data) => {
  const { id, ...rest } = data;
  try {
    const response = await pukisApi.patch(`/proveedores/${id}`, rest);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al actualizar al proveedor" };
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar al proveedor" };
  }
};

export const deleteProveedor = async (_, id) => {
  try {
    await pukisApi.delete(`/proveedores/${id}`);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar al proveedor" };
  }
};
