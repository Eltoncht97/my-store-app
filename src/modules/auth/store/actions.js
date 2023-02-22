// export const myAction = async ({ commit }) => {
// }

import pukisApi from "@/api/pukisApi";
import authApi from "@/api/pukisApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post("/auth/register", {
      email,
      password,
      fullName: name,
    });
    const { token, ...user } = data;

    const response = await pukisApi.post("/cajas", { user });
    if (!response.data) {
      return { ok: false, message: "Hubo un problema al crear la caja." };
    }

    commit("loginUser", { user, token });
    return { ok: true };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: "Hubo un problema al crear el usuario." };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const { data } = await authApi.post("/auth/login", { email, password });
    const { token, ...userData } = data;
    commit("loginUser", { user: userData, token });

    return { ok: true };
  } catch (error) {
    console.log(error.response);
    return { ok: false, message: error.response.data.error.message };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    commit("logout");
    return { ok: false, message: "No hay token" };
  }

  try {
    // mandartoken aqui
    const { data } = await authApi.get("/auth/check-auth-status");
    const { token, ...user } = data;

    commit("loginUser", { user, token });
    return { ok: true };
  } catch (error) {
    commit("logout");
    return { ok: false, message: error.response.data.error.message };
  }
};
