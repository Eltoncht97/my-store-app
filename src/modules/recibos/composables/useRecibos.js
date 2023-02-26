import { computed } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { isValidForm } from "@/utils/isValidForm";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const useRecibos = () => {
  const store = useStore();
  const router = useRouter();

  const recibo = computed(() => store.getters["recibos/getRecibo"])

  const rules = computed(() => {
    return {
      client: { required },
      paymentMethod: { required },
      total: { required, minValue: minValue(1) },
    };
  });

  const v$ = useVuelidate(rules, recibo);

  const recibos = computed(() => store.getters["recibos/getRecibos"]);

  const filterRecibos = (filterTxt) =>
    store.commit("recibos/filterRecibos", filterTxt);

  const loadRecibos = async () => {
    store.commit("ui/setLoading", true);
    await store.dispatch("recibos/loadRecibos");
    store.commit("ui/setLoading", false);
  };
  
  const loadRecibo = async (id) => {
    store.commit("ui/setLoading", true);
    await store.dispatch("recibos/getRecibo", id);
    store.commit("ui/setLoading", false);
  }

  const createRecibo = async (redirect=true) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch("recibos/createRecibo", recibo.value);
    if (resp.ok) {
      Swal.fire("Completado!", "Recibo creado exitosamente!", "success");
      if(redirect) router.push({ name: "recibos-list" });
    }
  };

  const resetRecibo = () => store.commit("recibos/resetRecibo")

  return {
    recibo,
    recibos,
    v$,

    createRecibo,
    loadRecibos,
    loadRecibo,
    filterRecibos,
    resetRecibo,
  };
};

export default useRecibos;
