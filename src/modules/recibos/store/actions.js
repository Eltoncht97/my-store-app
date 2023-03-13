// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadRecibos = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/recibos?limit=${limit}&offset=${offset}&keyword=${filterTxt}`
    );

    if (!response.data) {
      commit("setRecibos", []);
      return { ok: false, message: "Hubo un error al cargar los recibos" };
    }

    commit("setRecibos", response.data.recibos);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los recibos" };
  }
};

export const getRecibo = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/recibos/${id}`);

    if (!response.data) {
      commit("setRecibo", null);
      return { ok: false, message: "Hubo un error al cargar el recibo" };
    }

    commit("setRecibo", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el recibo" };
  }
};

export const createRecibo = async (_, reciboData) => {
  const { client, ...restData } = reciboData;

  try {
    const reciboResponse = await pukisApi.post("/recibos", {
      clientId: client.id,
      ...restData,
    });

    if (!reciboResponse.data) {
      return { ok: false, message: "Hubo un error al crear el recibo" };
    }

    // const movimientoResponse = await pukisApi.post("cajas/movimiento", {
    //   tipo: reciboData.paymentMethod,
    //   description: `Cobro ${reciboData.paymentMethod} ${client.lastname} ${client.name}`,
    //   monto: reciboData.total,
    // });

    // if (!movimientoResponse.data) {
    //   return {
    //     ok: false,
    //     message: "Hubo un problema al crear el movimiento en caja",
    //   };
    // }

    return { ok: true, message: "Recibo creado exitosamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el recibo" };
  }
};

export const deleteRecibo = async (_, id) => {
  try {
    await pukisApi.delete(`/recibos/${id}`);

    return { ok: true, message: "El recibo a sido eliminado." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el recibo" };
  }
};
