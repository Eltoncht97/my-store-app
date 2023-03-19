import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { errorAlert, successAlert } from "@/utils/customAlerts";
import { traspasoRules } from "../utils/traspasoRules";
import useVuelidate from "@vuelidate/core";
import { isValidForm } from "@/utils/isValidForm";

const useCajas = () => {
  const store = useStore();

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const traspaso = computed(() => store.getters["cajas/getTraspaso"]);
  const rules = computed(() => traspasoRules);

  const v$ = useVuelidate(rules, traspaso);

  const loadCajas = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch("cajas/getCajas", {
      filterTxt: pagination.value.filterTxt,
      limit: limited ? pagination.value.limit : "",
      offset: pagination.value.offset,
    });

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadCaja = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch("cajas/getCaja", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const loadInformeCaja = async (dates) => {
    const formatedDates = { ...dates };
    formatedDates.startDate = `${moment(formatedDates.startDate).format(
      "MM-DD-YYYY"
    )}T00:00:00Z`;
    formatedDates.endDate = `${moment(formatedDates.endDate).format(
      "MM-DD-YYYY"
    )}T23:59:59Z`;
    await store.dispatch("cajas/getInformeCaja", formatedDates);
  };

  const createTraspaso = async () => {
    if (!isValidForm(rules.value, v$.value)) return { ok: false };

    if (traspaso.value.total > traspaso.value.emisor.efectivo) {
      return errorAlert({
        text: "No posee suficiente efectivo para completar la operacion",
      });
    }

    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "cajas/createTraspaso",
      traspaso.value
    );

    store.commit("ui/setLoadingButton", false);

    if (!ok) {
      errorAlert({ text: message });
      return { ok: false };
    }

    loadCajas();
    successAlert({ text: message });
    return { ok: true };
  };

  return {
    caja: computed(() => store.getters["cajas/getCaja"]),
    cajas: computed(() => store.getters["cajas/getCajas"]),
    cajasAbiertas: computed(() => store.getters["cajas/getCajasAbiertas"]),
    informeData: computed(() => store.getters["cajas/getInformeData"]),
    totalMovimientos: computed(
      () => store.getters["cajas/getTotalMovimientos"]
    ),
    totalMovimientosInforme: computed(
      () => store.getters["cajas/getTotalMovimientosInforme"]
    ),
    traspaso,
    v$,

    loadCajas,
    loadCaja,
    resetCaja: () => store.commit("cajas/resetCaja"),
    resetTraspaso: () => store.commit("cajas/resetTraspaso"),
    loadInformeCaja,
    createTraspaso,
  };
};

export default useCajas;
