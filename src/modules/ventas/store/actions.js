// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const getClients = async ({ commit }) => {
  try {
    const response = await pukisApi.get(`/clients?limit=0`);

    if (!response.data.clients) {
      return;
    }

    commit("setClients", response.data.clients);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los clientes" };
  }
};

export const getProducts = async ({ commit }) => {
  try {
    const response = await pukisApi.get(`/products?limit=`);

    if (!response.data) {
      return;
    }

    commit("setProducts", response.data.products);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los productos" };
  }
};

export const createClient = async ({ dispatch }, data) => {
  try {
    const response = await pukisApi.post(`/clients`, data);

    if (!response.data) {
      return;
    }

    dispatch("getClients");

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el cliente" };
  }
};

export const createVenta = async ({ commit }, data) => {
  try {
    const { client, date, subtotal, discount, total, paymentMethod, products } =
      { ...data };

    const ventaData = {
      clientId: client.id,
      date,
      subtotal,
      discount,
      total,
      paymentMethod,
      products: products.map((p) => ({
        product: p.id,
        price: p.price,
        quantity: p.quantity,
        subtotal: p.subtotal,
        discount: p.discount,
        total: p.total,
      })),
    };
    const response = await pukisApi.post(`/ventas`, ventaData);

    if (!response.data) {
      return;
    }

    commit("addVenta", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear la venta" };
  }
};

export const loadVentas = async ({ commit }) => {
  try {
    const response = await pukisApi.get("/ventas");

    if (!response.data) {
      commit("setVentas", []);
      return;
    }

    commit("setVentas", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar las categorias" };
  }
};

export const getVenta = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/ventas/${id}`);

    if (!response.data) {
      commit("setVenta", null);
      return;
    }

    commit("setVenta", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar la venta" };
  }
};

export const deleteVenta = async ({ commit }, id) => {
  try {
    await pukisApi.delete(`/ventas/${id}`);
    commit("removeVenta", id);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al eliminar la venta" };
  }
};
