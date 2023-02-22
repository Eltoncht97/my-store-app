import pukisApi from "@/api/pukisApi";

// export const myAction = async ({ commit }) => {}
export const loadCajas = async ({ commit }) => {
  try {
    const response = await pukisApi.get("/cajas");

    if (!response.data) {
      commit("setCajas", []);
      return;
    }

    commit("setCajas", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar las cajas" };
  }
};

export const deleteCaja = async ({ commit }, id) => {
  try {
    await pukisApi.delete(`/cajas/${id}`);

    commit("removeCaja", id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar la caja" };
  }
};

export const getCaja = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/cajas/${id}`);

    if (!response.data) {
      commit("setCaja", null);
      return;
    }

    commit("setCaja", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la caja" };
  }
};

export const getInformeCaja = async (
  { commit },
  dates
) => {
  try {
    const response = await pukisApi.get(`/cajas/movimientos?startDate=${dates.startDate}&endDate=${dates.endDate}`, { dates });
    const response2 = await pukisApi.get(`/ventas/report?startDate=${dates.startDate}&endDate=${dates.endDate}`, { dates });

    console.log(response);
    console.log(response2);
    if (!response.data) {
      commit("setInformeCaja", null);
      return;
    }

    commit("setInformeCaja", {movimientos: response.data, ventas: response2.data});

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar la data del informe de caja",
    };
  }
};
