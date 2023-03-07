// export const myAction = async ({ commit }) => {}
import pukisApi from "@/api/pukisApi";

export const getPagos = async ({ commit }, params) => {
  const { filterTxt = "", limit = 10, offset = 0 } = params;
  try {
    const response = await pukisApi.get(
      `/pagos?limit=${limit}&offset=${offset}&keyword=${filterTxt}`
    );

    if (!response.data) {
      commit("setPagos", []);
      return { ok: false, message: "Hubo un error al cargar los pagos" };
    }

    commit("setPagos", response.data.pagos);

    return { ok: true, totalItems: response.data.count };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar los pagos" };
  }
};

export const getPago = async ({ commit }, id) => {
  try {
    const response = await pukisApi.get(`/pagos/${id}`);

    if (!response.data) {
      commit("setPago", null);
      return { ok: false, message: "Hubo un error al cargar el pago" };
    }

    commit("setPago", response.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al cargar el pago" };
  }
};

export const createPago = async (_, data) => {
  const { proveedor, ...restData } = data;

  try {
    const pagoResponse = await pukisApi.post("/pagos", {
      proveedorId: proveedor.id,
      ...restData,
    });

    if (!pagoResponse.data) {
      return { ok: false, message: "Hubo un error al crear el pago" };
    }

    const movimientoResponse = await pukisApi.post("cajas/movimiento", {
      tipo: data.paymentMethod,
      description: `Cobro ${data.paymentMethod} ${proveedor.lastname} ${proveedor.name}`,
      monto: data.total,
    });

    if (!movimientoResponse.data) {
      return {
        ok: false,
        message: "Hubo un problema al crear el movimiento en caja",
      };
    }

    return { ok: true, message: "Pago creado exitosamente" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Hubo un error al crear el pago" };
  }
};

// export const deletePago = async (_, id) => {
//   try {
//     await pukisApi.delete(`/pagos/${id}`);

//     return { ok: true, message: "El pago a sido eliminado." };
//   } catch (error) {
//     console.log(error);
//     return { ok: false, message: "Hubo un error al eliminar el pago" };
//   }
// };
