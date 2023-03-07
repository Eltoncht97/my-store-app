import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { errorAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { pagoRules } from "../utils/pagoRules";

const usePagos = () => {
  const store = useStore();
  const router = useRouter();

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const pago = computed(() => store.getters["pagos/getPago"]);
  const rules = computed(() => pagoRules);

  const v$ = useVuelidate(rules, pago);

  const loadPagos = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch("pagos/getPagos", {
      filterTxt: pagination.value.filterTxt,
      limit: limited ? pagination.value.limit : "",
      offset: pagination.value.offset,
    });

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadPago = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("pagos/getPago", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createPago = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "pagos/createPago",
      pago.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadPagos();

    if (!redirect) {
      return;
    }

    router.push({ name: "pagos-list" });
  };

  //TODO
  // const deleteRecibo = async (id) => {
  //   const isConfirmed = await confirmAlert({
  //     title: "Esta seguro de eliminar el recibo?",
  //   });

  //   if (!isConfirmed) return;

  //   const { ok, message } = await store.dispatch("recibos/deleteRecibo", id);

  //   if (!ok) return errorAlert({ text: message });

  //   successAlert({ text: message });
  //   loadRecibos();
  // };

  return {
    pago,
    pagos: computed(() => store.getters["pagos/getPagos"]),
    v$,

    createPago,
    loadPagos,
    loadPago,
    resetPago: () => store.commit("pagos/resetPago"),
  };
};

export default usePagos;
