import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";

import { isValidForm } from "@/utils/isValidForm";
import { confirmAlert, errorAlert, successAlert } from "@/utils/customAlerts";
import { clientRules } from "../utils/clientRules";

const useClients = () => {
  const store = useStore();
  const router = useRouter();

  const filterSaldo = ref("todos");
  const pagination = computed(() => store.getters["ui/getPagination"]);

  const client = computed(() => store.getters["clients/getClient"]);
  const rules = computed(() => clientRules);

  const v$ = useVuelidate(rules, client);

  const loadClients = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "clients/getClients",
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

  const loadClient = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("clients/getClient", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createClient = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "clients/createClient",
      client.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadClients();

    if (!redirect) {
      return;
    }
    router.push({ name: "clients-list" });
  };

  const updateClient = async () => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const isConfirmed = await confirmAlert({
      title: "Esta seguro de actualizar el cliente?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch(
      "clients/updateClient",
      client.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    router.push({ name: "clients-list" });
  };

  const deleteClient = async (id) => {
    const isConfirmed = await confirmAlert({
      title: "Esta seguro de eliminar el cliente?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch("clients/deleteClient", id);

    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadClients();
  };

  return {
    client,
    clients: computed(() => store.getters["clients/getClients"]),
    filterSaldo,
    v$,

    createClient,
    deleteClient,
    loadClient,
    loadClients,
    resetClient: () => store.commit("clients/resetClient"),
    updateClient,
  };
};

export default useClients;
