// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadClients = async (
  { commit, state },
  { page = 1, filterTxt = "", filterSaldo, limit=10 }
) => {
  try {
    commit("updateOffset", page);
    const response = await pukisApi.get(
      `/clients?limit=${limit}&offset=${state.pagination.offset}&keyword=${filterTxt}&${
        filterSaldo === "saldo" && "saldo=true"
      }`
    );

    if (!response.data) {
      commit("setClients", []);
      return;
    }

    commit("setClients", response.data.clients);
    commit("setCountClients", response.data.count);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los clientes" };
  }
};

export const getClient = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/clients/${id}`);
    console.log(response);

    if (!response.data) {
      commit("setClient", null);
      return;
    }

    commit("setClient", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el cliente" };
  }
};

export const createClient = async ({ commit }, data) => {
  try {
    const response = await pukisApi.post(`/clients`, data);

    if (!response.data) {
      return;
    }

    commit("addClient", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el cliente" };
  }
};

export const updateClient = async ({ commit }, client) => {
  const { id, ...dataToUpdate } = client;
  console.log(dataToUpdate);
  try {
    const response = await pukisApi.patch(`/clients/${id}`, {
      ...dataToUpdate,
    });

    if (!response.data) {
      commit("setClient", null);
      return;
    }

    commit("setClient", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el cliente" };
  }
};

export const deleteClient = async (_, id) => {
  try {
    await pukisApi.delete(`/clients/${id}`);

    // commit("removeClient", id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el cliente" };
  }
};
