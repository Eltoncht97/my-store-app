// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getCuenta = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/clients/accounts/${id}`);

    if (!response.data) {
      commit("setCuenta", null);
      return { ok: false, message: "Hubo un error al cargar la cuenta." };
    }

    commit("setCuenta", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la cuenta." };
  }
};
