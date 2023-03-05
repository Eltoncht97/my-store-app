import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { confirmAlert, errorAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { getIVAValue } from "@/utils/getIvaValue";
import { productRules } from "../utils/productRules";

const useProducts = () => {
  const store = useStore();
  const router = useRouter();

  const categoryFilter = ref("");
  const pagination = computed(() => store.getters["ui/getPagination"]);

  const product = computed(() => store.getters["products/getProduct"]);
  const rules = computed(() => productRules);

  const v$ = useVuelidate(rules, product);

  const loadProducts = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "products/loadProducts",
      {
        filterTxt: pagination.value.filterTxt,
        category: categoryFilter.value,
        limit: limited ? pagination.value.limit : "",
        offset: pagination.value.offset,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadProduct = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("products/getProduct", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createProduct = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "products/createProduct",
      product.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadProducts();

    if (!redirect) {
      return;
    }
    router.push({ name: "clients-list" });
  };

  const updateProduct = async () => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const isConfirmed = await confirmAlert({
      title: "Esta seguro de actualizar el producto?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "products/updateProduct",
      product.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    router.push({ name: "products-list" });
  };

  const deleteProduct = async (id) => {
    const isConfirmed = await confirmAlert({
      title: "Esta seguro de eliminar el producto?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch("products/deleteProduct", id);

    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadProducts();
  };

  return {
    createProduct,
    deleteProduct,
    loadProduct,
    loadProducts,
    updateProduct,
    v$,
    categoryFilter,
    product,
    products: computed(() => store.getters["products/getProducts"]),
    resetProduct: () => store.commit("products/resetProduct"),
    calcDiscount: () => {
      product.value.discount = Math.round(
        (product.value.costWithoutIva * product.value.discountPercentage) / 100
      );
    },
    calcUtilities: () => {
      product.value.utilities = Math.round(
        (product.value.costPrice * product.value.utilitiesPercentage) / 100
      );
    },
    calcDiscountPercentage: () => {
      product.value.discountPercentage = Math.round(
        (product.value.discount * 100) / product.value.costWithoutIva
      );
    },
    calcIva: () => {
      product.value.iva =
        (product.value.costWithoutIva * getIVAValue(product.value.ivaType)) /
        100;
    },
    calcUtilitiesPercentage: () => {
      product.value.utilitiesPercentage = Math.round(
        (product.value.utilitiesPercentage * 100) / product.value.costPrice
      );
    },
    pageCount: computed(() => store.getters["products/getTotalProducts"]),
    pagesCount: computed(() => store.getters["products/getProductPages"]),
  };
};

export default useProducts;
