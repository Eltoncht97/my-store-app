// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getOrdenesDeCompra = async ({ commit }) => {
  try {
    const response = await pukisApi.get(`/ordenes-ingreso`);

    if (!response.data) {
      commit("setOrdenesDeCompra", []);
      return;
    }
    commit("setOrdenesDeCompra", response.data.ingresos);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar las ordenes de compra/ingreso",
    };
  }
};

export const createIngreso = async (_, data) => {
  //peticion axios de create
  console.log(data);
};
