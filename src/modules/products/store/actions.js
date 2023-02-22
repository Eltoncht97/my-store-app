// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadProducts = async (
  { commit, state },
  { page = 1, filterTxt = "", category }
) => {
  try {
    commit("updateOffset", page);
    const response = await pukisApi.get(
      `/products?offset=${state.pagination.offset}`,
      {
        params: {
          keyword: filterTxt,
          category: category || undefined,
        },
      }
    );

    if (!response.data) {
      commit("setProducts", []);
      return;
    }

    commit("setProducts", response.data.products);
    commit("setCountProducts", response.data.count);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los productos" };
  }
};

export const getProduct = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/products/${id}`);

    if (!response.data) {
      commit("setProduct", null);
      return;
    }

    commit("setProduct", response.data);

    return { ok: true, product: response.data };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el producto" };
  }
};

export const createProduct = async ({ commit }, data) => {
  try {
    const response = await pukisApi.post(`/products`, data);

    if (!response.data) {
      return;
    }

    commit("addProduct", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el producto" };
  }
};

export const updateProduct = async ({ commit }, product) => {
  const { id, category, ...restToUpdate } = product;
  restToUpdate.categoryId = category.id;
  try {
    const response = await pukisApi.patch(`/products/${id}`, {
      ...restToUpdate,
    });

    if (!response.data) {
      commit("setProduct", null);
      return;
    }

    commit("setProduct", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el producto" };
  }
};

export const deleteProduct = async ({ commit }, id) => {
  try {
    await pukisApi.delete(`/products/${id}`);

    commit("removeProduct", id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el producto" };
  }
};
