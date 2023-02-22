import { ref } from "vue";
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

  const recibo = ref({
    client: "",
    paymentMethod: "",
    total: null,
  });

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
    await store.dispatch("recibos/loadRecibos");
  };

  const createRecibo = async (redirect=true) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch("recibos/createRecibo", recibo.value);
    if (resp.ok) {
      Swal.fire("Completado!", "Recibo creado exitosamente!", "success");
      if(redirect) router.push({ name: "recibos-list" });
    }
  };

  const resetRecibo = () => {
    recibo.value = {
      client: "",
      paymentMethod: "",
      total: null,
    };
  };

  return {
    recibo,
    recibos,
    v$,

    createRecibo,
    loadRecibos,
    filterRecibos,
    resetRecibo,
  };
};

export default useRecibos;
