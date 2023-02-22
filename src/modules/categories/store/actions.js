// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadCategories = async ({ commit }) => {
  try {
    const { data } = await pukisApi.get("/categories");

    if (!data) {
      commit("setCategories", []);
      return;
    }

    commit("setCategories", data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar las categorias" };
  }
};

export const getCategory = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(
      `/categories/${id}`
    );

    if (!response.data) {
      commit("setCategory", null);
      return;
    }

    commit("setCategory", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la categoria" };
  }
};

export const createCategory = async ({ commit }, data) => {
  try {
    const response = await pukisApi.post(
      `/categories`,
      data
    );

    if (!response.data) {
      return;
    }

    commit("addCategory", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear la categoria" };
  }
};

export const updateCategory = async ({ commit }, category) => {
  const {id, name, active} = category
  console.log(category)
  try {
    const response = await pukisApi.patch(
      `/categories/${id}`,
      {name, active}
    );

    if (!response.data) {
      commit("setCategory", null);
      return;
    }

    commit("setCategory", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar la categoria" };
  }
};

export const deleteCategory = async ({ commit }, id) => {
  try {
    await pukisApi.delete(`/categories/${id}`);

    commit("removeCategory", id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar la categoria" };
  }
};
