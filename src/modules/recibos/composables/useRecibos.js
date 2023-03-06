import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { errorAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { reciboRules } from "../utils/reciboRules";

const useRecibos = () => {
  const store = useStore();
  const router = useRouter();

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const recibo = computed(() => store.getters["recibos/getRecibo"]);
  const rules = computed(() => reciboRules);

  const v$ = useVuelidate(rules, recibo);

  const filterRecibos = (filterTxt) =>
    store.commit("recibos/filterRecibos", filterTxt);

  const loadRecibos = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "recibos/loadRecibos",
      {
        filterTxt: pagination.value.filterTxt,
        limit: limited ? pagination.value.limit : "",
        offset: pagination.value.offset,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadRecibo = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("recibos/getRecibo", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createRecibo = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "recibos/createRecibo",
      recibo.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadRecibos();

    if (!redirect) {
      return;
    }

    router.push({ name: "recibos-list" });
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
    recibo,
    recibos: computed(() => store.getters["recibos/getRecibos"]),
    v$,

    createRecibo,
    loadRecibos,
    loadRecibo,
    filterRecibos,
    resetRecibo: () => store.commit("recibos/resetRecibo"),
  };
};

export default useRecibos;
