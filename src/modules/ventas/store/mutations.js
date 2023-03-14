import moment from "moment"
import { computed } from "vue"

// export const myAction = ( state, payload ) => {}
export const setVentas = ( state, payload ) => {
  state.ventas = payload
}

export const setVenta = ( state, payload ) => {
  state.venta = payload
}

export const setClients = ( state, payload ) => {
  state.clients = payload
}

export const setProducts = ( state, payload ) => {
  state.products = payload
}

export const resetVenta = ( state ) => {
  state.venta = {
    client: "",
    products: [],
    date: moment().format("yyyy-MM-DD"),
    quantityProduct: 1,
    discountProduct: 0,
    discountValue: 0,
    subtotalProduct: computed(
      () =>
        state.product &&
        state.product.price * state.venta.quantityProduct -
          state.venta.discountProduct * state.venta.quantityProduct
    ),
    discount: 0,
    paymentMethod: "",
    subtotal: computed(() =>
      state.venta.products
        .map((p) => p.total)
        .reduce((prev, curr) => prev + curr, 0)
    ),
    total: computed(() => state.venta.subtotal - state.venta.discount),
  }
}

export const resetModule = ( state ) => {
  state.venta = null
  state.clients = []
  state.products = []
}