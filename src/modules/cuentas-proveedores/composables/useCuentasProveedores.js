import { computed } from "vue";
import { useStore } from "vuex";
import { errorAlert } from "@/utils/customAlerts";

const useCuentasProveedores = () => {
  const store = useStore();

  const loadCuenta = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "cuentasProveedores/getCuenta",
      id
    );

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  return {
    loadCuenta,
    cuenta: computed(() => store.getters["cuentasProveedores/getCuenta"]),
    totalMovimientos: computed(
      () => store.getters["cuentasProveedores/getTotalMovimientos"]
    ),
  };
};

export default useCuentasProveedores;
