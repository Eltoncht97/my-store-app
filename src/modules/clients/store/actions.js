// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const getClients = async ({ commit }, params) => {
  const { filterTxt = "", filterSaldo, limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/clients?limit=${limit}&offset=${offset}&keyword=${filterTxt}&${
        filterSaldo === "saldo" && "saldo=true"
      }`
    );

    if (!response.data) {
      commit("setClients", []);
      return { ok: false, message: "Hubo un error al cargar los clientes" };
    }

    commit("setClients", response.data.clients);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los clientes" };
  }
};

export const getClient = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/clients/${id}`);

    if (!response.data) {
      commit("setClient", null);
      return { ok: false, message: "Hubo un error al cargar el cliente" };
    }

    commit("setClient", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el cliente" };
  }
};

export const createClient = async (_, data) => {
  try {
    const response = await pukisApi.post(`/clients`, data);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al crear el cliente" };
    }

    return { ok: true, message: "Cliente creado exitosamente." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el cliente" };
  }
};

export const updateClient = async (_, client) => {
  const { id, ...dataToUpdate } = client;

  try {
    const response = await pukisApi.patch(`/clients/${id}`, {
      ...dataToUpdate,
    });

    if (!response.data) {
      return { ok: false, message: "Hubo un error al actualizar el cliente" };
    }

    return { ok: true, message: "El cliente a sido actualizado." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el cliente" };
  }
};

export const deleteClient = async (_, id) => {
  try {
    await pukisApi.delete(`/clients/${id}`);

    return { ok: true, message: "El cliente a sido eliminado." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el cliente" };
  }
};
