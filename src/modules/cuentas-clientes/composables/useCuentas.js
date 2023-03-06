import { computed } from "vue";
import { useStore } from "vuex";
import { errorAlert } from "@/utils/customAlerts";

const useCuentasCorrientes = () => {
  const store = useStore();

  const loadCuenta = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "cuentasClientes/getCuenta",
      id
    );

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  return {
    loadCuenta,
    cuenta: computed(() => store.getters["cuentasClientes/getCuenta"]),
    totalMovimientos: computed(
      () => store.getters["cuentasClientes/getTotalMovimientos"]
    ),
  };
};

export default useCuentasCorrientes;
