// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getCuenta = async ({ commit }, id) => {
  try {
    const { data } = await pukisApi.get(`/proveedores/accounts/${id}`);

    if (!data) {
      commit("setCuenta", null);
      return {
        ok: false,
        message: "Hubo un error al cargar la cuenta del proveedor.",
      };
    }

    commit("setCuenta", data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar la cuenta del proveedor.",
    };
  }
};
