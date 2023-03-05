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

  const loadClients = async () => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset");

    const { ok, message, totalItems } = await store.dispatch(
      "clients/loadClients",
      {
        limit: pagination.value.limit,
        offset: pagination.value.offset,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const filterClients = async (filterTxt) => {
    store.commit("ui/setLoading", true);
    await store.dispatch("clients/loadClients", {
      filterTxt,
      filterSaldo: filterSaldo.value,
      limit: pagination.value.limit,
    });
    store.commit("ui/setLoading", false);
  };

  const loadClient = async (id) => {
    store.commit("ui/setLoading", true);

    const { ok, message } = await store.dispatch("clients/getClient", id);

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/setLoading", false);
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

    successAlert({ text: "Cliente creado exitosamente!" });
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

  // onMounted(() => {
  //   store.commit("clients/resetClient");
  // });

  return {
    client,
    clients: computed(() => store.getters["clients/getClients"]),
    filterSaldo,
    pagination,
    totalClients: computed(() => store.getters["clients/getTotalClients"]),
    totalPages: computed(() => store.getters["clients/getClientsPages"]),
    v$,

    createClient,
    deleteClient,
    filterClients,
    loadClient,
    loadClients,
    resetClient: () => store.commit("clients/resetClient"),
    updateClient,
  };
};

export default useClients;
