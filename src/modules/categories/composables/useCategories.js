import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { errorAlert, confirmAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { categoryRules } from "../utils/categoryRules";

const useCategories = () => {
  const store = useStore();
  const router = useRouter();

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const category = computed(() => store.getters["categories/getCategory"]);
  const rules = computed(() => categoryRules);

  const v$ = useVuelidate(rules, category);

  const loadCategories = async () => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset");

    const { ok, message, totalItems } = await store.dispatch(
      "categories/getCategories",
      {
        limit: pagination.value.limit,
        offset: pagination.value.offset,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const filterCategories = async (filterTxt) => {
    store.commit("ui/setLoading", true);
    await store.dispatch("categories/getCategories", {
      filterTxt,
      limit: pagination.value.limit,
    });
    store.commit("ui/setLoading", false);
  };

  const loadCategory = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("categories/getCategory", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createCategory = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "categories/createCategory",
      category.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadCategories();

    if (!redirect) {
      return;
    }

    router.push({ name: "categories-list" });
  };

  const updateCategory = async () => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const isConfirmed = await confirmAlert({
      title: "Esta seguro de actualizar la categoría?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "categories/updateCategory",
      category.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    router.push({ name: "categories-list" });
  };

  const deleteCategory = async (id) => {
    const isConfirmed = await confirmAlert({
      title: "Esta seguro de eliminar la categoría?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "categories/deleteCategory",
      id
    );

    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadCategories();
  };

  return {
    category,
    categories: computed(() => store.getters["categories/getCategories"]),
    v$,

    createCategory,
    deleteCategory,
    filterCategories,
    loadCategories,
    loadCategory,
    resetCategory: () => store.commit("categories/resetCategory"),
    updateCategory,
  };
};

export default useCategories;
