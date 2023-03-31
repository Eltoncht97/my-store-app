// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const loadProducts = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0, category } = params;
  try {
    const response = await pukisApi.get(
      `/products?limit=${limit}&offset=${offset}`,
      {
        params: {
          keyword: filterTxt,
          category: category || undefined,
        },
      }
    );

    if (!response.data) {
      commit("setProducts", []);
      return { ok: false, message: "Hubo un error al cargar los productos" };
    }

    commit("setProducts", response.data.products);

    return { ok: true, totalItems: response.data.count };
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
      return { ok: false, message: "Hubo un error al cargar el producto" };
    }

    console.log({ product: response.data });

    commit("setProduct", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el producto" };
  }
};

export const createProduct = async (_, data) => {
  try {
    const response = await pukisApi.post(`/products`, data);

    if (!response.data) {
      return { ok: false, message: "Hubo un error al crear el producto" };
    }

    return { ok: true, message: "Producto creado exitosamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el producto" };
  }
};

export const updateProduct = async (_, product) => {
  const { id, category, ...dataToUpdate } = product;
  dataToUpdate.categoryId = category.id;

  try {
    const response = await pukisApi.patch(`/products/${id}`, {
      ...dataToUpdate,
    });

    if (!response.data) {
      return { ok: false, message: "Hubo un error al actualizar el producto" };
    }

    return { ok: true, message: "El producto a sido actualizado" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al actualizar el producto" };
  }
};

export const deleteProduct = async (_, id) => {
  try {
    await pukisApi.delete(`/products/${id}`);

    return { ok: true, message: "El producto a sido eliminado." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar el producto" };
  }
};
