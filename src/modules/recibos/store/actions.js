// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadRecibos = async ({ commit }) => {
  try {
    const { data } = await pukisApi.get("/recibos");

    if (!data) {
      commit("setRecibos", []);
      return;
    }

    commit("setRecibos", data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los recibos" };
  }
};

export const loadRecibo = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/recibos/${id}`);

    if (!response.data) {
      commit("setRecibo", null);
      return;
    }

    commit("setRecibo", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el recibo" };
  }
};

export const createRecibo = async ({ commit }, reciboData) => {
  const { client, ...restData } = reciboData;
  console.log({ ...restData });
  try {
    const response = await pukisApi.post("/recibos", {
      clientId: client.id,
      ...restData,
    });

    if (!response.data) {
      commit("setRecibo", null);
      return;
    }

    commit("setRecibo", response.data);

    const response2 = await pukisApi.post("cajas/movimiento", {
      tipo: reciboData.paymentMethod,
      description: `Cobro ${reciboData.paymentMethod} ${client.lastname} ${client.name}`,
      monto: reciboData.total,
    });

    if (!response2.data) {
      return {
        ok: false,
        message: "Hubo un problema al crear el movimiento en caja",
      };
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el recibo" };
  }
};
