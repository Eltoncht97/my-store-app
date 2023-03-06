import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";

import { confirmAlert, errorAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { proveedorRules } from "../utils/proveedorRules";

const useProveedores = () => {
  const store = useStore();
  const router = useRouter();

  const filterSaldo = ref("todos");
  const pagination = computed(() => store.getters["ui/getPagination"]);

  const proveedor = computed(() => store.getters["proveedores/getProveedor"]);
  const rules = computed(() => proveedorRules);

  const v$ = useVuelidate(rules, proveedor);

  const loadProveedores = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "proveedores/getProveedores",
      {
        filterTxt: pagination.value.filterTxt,
        limit: limited ? pagination.value.limit : "",
        offset: pagination.value.offset,
        filterSaldo: filterSaldo.value,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadProveedor = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "proveedores/getProveedor",
      id
    );

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createProveedor = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "proveedores/createProveedor",
      proveedor.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadProveedores();

    if (!redirect) {
      return;
    }
    router.push({ name: "proveedores-list" });
  };

  const updateProveedor = async () => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const isConfirmed = await confirmAlert({
      title: "Esta seguro de actualizar el proveedor?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "proveedores/updateProveedor",
      proveedor.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    router.push({ name: "proveedores-list" });
  };

  const deleteProveedor = async (id) => {
    const isConfirmed = await confirmAlert({
      title: "Esta seguro de eliminar el proveedor?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "proveedores/deleteProveedor",
      id
    );

    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadProveedores();
  };

  return {
    filterSaldo,
    proveedor,
    proveedores: computed(() => store.getters["proveedores/getProveedores"]),
    v$,
    createProveedor,
    loadProveedor,
    loadProveedores,
    updateProveedor,
    deleteProveedor,
    resetProveedor: () => store.commit("proveedores/resetProveedor"),
  };
};

export default useProveedores;
