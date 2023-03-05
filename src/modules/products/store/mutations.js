import { getIVAValue } from "@/utils/getIvaValue"
import { computed } from "vue"

// export const myAction = ( state, payload ) => {}
export const setProducts = (state, products) => {
  state.products = products
  state.productsFiltered = products
}

export const filterProducts = (state, filterTxt) => {
  state.productsFiltered = state.products.filter(product => product.code == filterTxt || product.name.toLowerCase().includes(filterTxt) || product.category.toLowerCase().includes(filterTxt))
}

export const setProduct = (state, product) => {
  state.product = {
    ...product,
    category: product.category.id,
    iva: computed(() => {
      return (
        (product.costWithoutIva * getIVAValue(product.ivaType)) /
        100
      );
    }),
    costPrice: computed(
      () =>
        product.costWithoutIva -
        product.discount +
        product.iva
    ),
    price: computed(
      () => product.costPrice + product.utilities
    )
  }
}

export const addProduct = (state, product) => {
  state.products.push(product)
  state.productsFiltered.push(product)
}

export const removeProduct = (state, id) => {
  state.products = state.products.filter(product => product.id !== id)
  state.productsFiltered = state.products
}

export const resetProduct = (state) => {
  state.product = {
    name: '',
    categoryId: '',
    code: '',
    stock: 0,
    stockMin: 0,
    costWithoutIva: 0,
    discountPercentage: 0,
    discount: 0,
    ivaType: '',
    iva: computed(() => {
      return (
        (state.product.costWithoutIva * getIVAValue(state.product.ivaType)) /
        100
      );
    }),
    costPrice: computed(
      () =>
        state.product.costWithoutIva -
        state.product.discount +
        state.product.iva
    ),
    utilitiesPercentage: 0,
    utilities: 0,
    price: computed(() => state.product.costPrice + state.product.utilities)
  }
}

export const resetModule = (state) => {
  state.products = []
  state.productsFiltered = []
  state.product = null
}

export const setCountProducts = (state, payload) => {
  state.pagination.count = payload
}

export const updateOffset = (state, page) => {
  state.pagination.offset = (page - 1) * 10
}