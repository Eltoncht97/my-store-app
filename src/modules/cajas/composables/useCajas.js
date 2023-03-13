import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { errorAlert } from "@/utils/customAlerts";

const useCajas = () => {
  const store = useStore();

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const loadCajas = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "cajas/getCajas",
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

  const loadCaja = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "cajas/getCaja",
      id
    );

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  }

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

  return {
    caja: computed(() => store.getters["cajas/getCaja"]),
    cajas: computed(() => store.getters["cajas/getCajas"]),
    informeData: computed(() => store.getters["cajas/getInformeData"]),
    totalMovimientos: computed(
      () => store.getters["cajas/getTotalMovimientos"]
    ),
    totalMovimientosInforme: computed(
      () => store.getters["cajas/getTotalMovimientosInforme"]
    ),

    loadCajas,
    loadCaja,
    resetCaja: () => store.commit("cajas/resetCaja"),
    loadInformeCaja,
  };
};

export default useCajas;
