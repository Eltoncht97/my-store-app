// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const getCategories = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/categories?limit=${limit}&offset=${offset}&keyword=${filterTxt}`
    );

    if (!response.data) {
      commit("setCategories", []);
      return { ok: false, message: "Hubo un error al cargar las categorias" };
    }

    commit("setCategories", response.data.categories);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar las categorias" };
  }
};

export const getCategory = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/categories/${id}`);

    if (!response.data) {
      commit("setCategory", null);
      return { ok: false, message: "Hubo un error al cargar la categoria" };
    }

    commit("setCategory", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la categoria" };
  }
};

export const createCategory = async (_, data) => {
  try {
    const response = await pukisApi.post(`/categories`, data);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al crear la categoria" };
    }

    return { ok: true, message: "Categoría creada exitosamente." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear la categoria" };
  }
};

export const updateCategory = async (_, category) => {
  const { id, name } = category;
  console.log(category);
  try {
    const response = await pukisApi.patch(`/categories/${id}`, {
      name,
    });

    if (!response.data) {
      return { ok: false, message: "Hubo un error al actualizar la categoria" };
    }

    return { ok: true, message: "La categoría a sido actualizada" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar la categoria" };
  }
};

export const deleteCategory = async (_, id) => {
  try {
    await pukisApi.delete(`/categories/${id}`);

    return { ok: true, message: "El cliente a sido eliminado." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar la categoria" };
  }
};
