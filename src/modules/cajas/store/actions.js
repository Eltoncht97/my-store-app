import pukisApi from "@/api/pukisApi";

// export const myAction = async ({ commit }) => {}
export const getCajas = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/cajas?limit=${limit}&offset=${offset}&keyword=${filterTxt}`
    );

    if (!response.data) {
      commit("setCajas", []);
      return { ok: false, message: "Hubo un error al cargar las cajas" };
    }

    commit("setCajas", response.data.cajas);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar las cajas" };
  }
};

export const getCaja = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/cajas/${id}`);

    if (!response.data) {
      commit("setCaja", null);
      return { ok: false, message: "Hubo un error al cargar la caja" };
    }

    commit("setCaja", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la caja" };
  }
};

export const getInformeCaja = async ({ commit }, dates) => {
  try {
    const response = await pukisApi.get(
      `/cajas/movimientos?startDate=${dates.startDate}&endDate=${dates.endDate}`,
      { dates }
    );
    const response2 = await pukisApi.get(
      `/ventas/report?startDate=${dates.startDate}&endDate=${dates.endDate}`,
      { dates }
    );

    console.log(response);
    console.log(response2);
    if (!response.data) {
      commit("setInformeCaja", null);
      return;
    }

    commit("setInformeCaja", {
      movimientos: response.data,
      ventas: response2.data,
    });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar la data del informe de caja",
    };
  }
};

export const createTraspaso = async (_, data) => {
  try {
    const resp = await pukisApi.post(
      `/cajas/traspaso/${data.emisor.id}/${data.receptor.id}`,
      { monto: Number(data.total) }
    );

    if (!resp.data) {
      return {
        ok: false,
        message: "Hubo un error al crear el traspaso de cajas",
      };
    }

    return { ok: true, message: "Traspaso de efectivo completado" };
  } catch (error) {
    return {
      ok: false,
      message: "Hubo un error al crear el traspaso de cajas",
    };
  }
};
