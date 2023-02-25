import { ref, computed } from "vue";
import { useStore } from "vuex";
import moment from 'moment';
import { confirmDelete, successAlert } from "../utils/alerts";

const useCajas = () => {
  const store = useStore();

  const filter = ref("");

  const deleteCaja = async (id) => {
    const confirm = await confirmDelete();

    if (confirm) {
      const resp = await store.dispatch("cajas/deleteCaja", id);
      if (resp.ok) {
        successAlert("Eliminado", "Caja eliminada");
      }
    }
  };

  const loadInformeCaja = async (dates) => {
    const formatedDates = {...dates}
    formatedDates.startDate = `${moment(formatedDates.startDate).format('MM-DD-YYYY')}T00:00:00Z`
    formatedDates.endDate = `${moment(formatedDates.endDate).format('MM-DD-YYYY')}T23:59:59Z`
    console.log(formatedDates);
    //del token sacara el usuario y con el la caja para los movimientos
    await store.dispatch("cajas/getInformeCaja", formatedDates);
  };

  return {
    deleteCaja,
    filter,

    cajas: computed(() => store.getters["cajas/getCajas"]),
    caja: computed(() => store.getters["cajas/getCaja"]),
    filterCajas: (filterTxt) => store.commit("cajas/filterCajas", filterTxt),
    loadCajas: async () => {
      await store.dispatch("cajas/loadCajas");
    },
    loadCaja: async (id) => {
      await store.dispatch("cajas/getCaja", id);
    },
    loadInformeCaja,
    informeData: computed(() => store.getters["cajas/getInformeData"]),
    totalMovimientos: computed(() => store.getters["cajas/getTotalMovimientos"])
  };
};

export default useCajas;
