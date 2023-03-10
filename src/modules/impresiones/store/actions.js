// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getDocument = async ({ commit }, payload) => {
  const { type, id } = payload;

  try {
    const resp = await pukisApi.get(`/${type}/${id}`);

    if (!resp.data) {
      commit("setDocument", []);
      return { ok: false, message: "Hubo un error al cargar el documento" };
    }
    commit("setDocument", resp.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el documento" };
  }
};
