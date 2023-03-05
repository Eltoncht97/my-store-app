import { getIVAValue } from "@/utils/getIvaValue";
import { computed } from "vue";

// export const myAction = ( state, payload ) => {}
export const setProducts = (state, products) => {
  state.products = products;
};

export const setProduct = (state, product) => {
  state.product = {
    ...product,
    category: product.category.id,
    iva: computed(() => {
      return (product.costWithoutIva * getIVAValue(product.ivaType)) / 100;
    }),
    costPrice: computed(
      () => product.costWithoutIva - product.discount + product.iva
    ),
    price: computed(() => product.costPrice + product.utilities),
  };
};

export const resetProduct = (state) => {
  state.product = {
    name: "",
    category: "",
    code: "",
    stock: 0,
    stockMin: 0,
    costWithoutIva: 0,
    discountPercentage: 0,
    discount: 0,
    ivaType: "",
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
    price: computed(() => state.product.costPrice + state.product.utilities),
  };
};

export const resetModule = (state) => {
  state.products = [];
  state.productsFiltered = [];
  state.product = null;
};
