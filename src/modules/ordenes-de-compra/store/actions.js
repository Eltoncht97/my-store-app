// export const myAction = async ({ commit }) => {}

import pukisApi from "@/api/pukisApi";

export const getOrdenesDeCompra = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/ordenes-ingreso?limit=${limit}&offset=${offset}&keyword=${filterTxt}`
    );

    if (!response.data) {
      commit("setOrdenesDeCompra", []);
      return {
        ok: false,
        message: "Hubo un error al cargar las ordenes de compra/ingreso",
      };
    }

    commit("setOrdenesDeCompra", response.data.ingresos);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar las ordenes de compra/ingreso",
    };
  }
};

export const getOrdenDeCompra = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/ordenes-ingreso/${id}`);

    if (!response.data) {
      commit("setOrdenDeIngreso", null);
      return {
        ok: false,
        message: "Hubo un error al taer los datos de la orden de ingreso",
      };
    }

    commit("setOrdenDeIngreso", response.data);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al traer los datos de la orden de ingreso",
    };
  }
};

export const createIngreso = async (_, data) => {
  try {
    const { proveedor, date, factura, subtotal, discount, total, products } = {
      ...data,
    };

    const ingresoData = {
      proveedorId: proveedor.id,
      date,
      factura,
      subtotal,
      discount,
      total,
      products: products.map((p) => ({
        product: p.id,
        price: p.price,
        quantity: p.quantity,
        subtotal: p.subtotal,
        discount: p.discount,
        total: p.total,
        impuestos: p.impuestos,
        iva: p.iva,
      })),
    };
    const response = await pukisApi.post("/ordenes-ingreso", ingresoData);

    if (!response.data) {
      return {
        ok: false,
        message: "Hubo un error al crear la orden de compra/ingreso",
      };
    }

    return { ok: true, message: "Orden de Ingreso creada!" };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al crear la orden de compra/ingreso",
    };
  }
};

export const getInformeCompras = async ({ commit }, dates) => {
  try {
    const response = await pukisApi.get(
      `/ordenes-ingreso/report-compras?startDate=${dates.startDate}&endDate=${dates.endDate}`);

    console.log(response);
    if (!response.data) {
      commit("setInformeCompras", null);
      return;
    }

    commit("setInformeCompras", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un error al cargar la data del informe de compras",
    };
  }
};