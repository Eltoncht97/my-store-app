// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadUsers = async ({ commit }) => {
  try {
    const response = await pukisApi.get("/users");
    console.log(response);

    if (!response.data) {
      commit("setUsers", []);
      return;
    }

    commit("setUsers", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los usuarios" };
  }
};

export const getUser = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/users/${id}`);
    console.log(response);

    if (!response.data) {
      commit("setUser", null);
      return;
    }

    commit("setUser", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el usuario" };
  }
};

export const createUser = async (_, data) => {
  try {
    const response = await pukisApi.post(`/auth/register`, data);
    console.log(response);
    if (!response.data) {
      return;
    }
    const response1 = await pukisApi.post("/cajas", { userId: response.data.id });
    if (!response1.data) {
      return { ok: false, message: "Hubo un problema al crear la caja." };
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el usuario" };
  }
};

export const updateUser = async ({ commit }, user) => {
  try {
    const response = await pukisApi.patch(`/users/${user.id}`, user);

    if (!response.data) {
      commit("setUser", null);
      return { ok: false, message: "Hubo un error al actualizar el usuario" };
    }
    
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el usuario" };
  }
};

export const deleteUser = async ({ commit }, id) => {
  try {
    await pukisApi.delete(`/users/${id}`);

    commit("removeUser", id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el usuario" };
  }
};
