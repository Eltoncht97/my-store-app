import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";
import { isValidForm } from "@/utils/isValidForm";

const useClients = () => {
  const store = useStore();
  const router = useRouter();

  const filterSaldo = ref("todos");
  const currentPage = ref(1);
  // const limit = ref(5);

  const client = computed(() => store.getters["clients/getClient"]);
  const pagination = computed(() => store.getters["clients/getPagination"]);

  const rules = computed(() => {
    return {
      name: { required },
      lastname: { required },
      phone: { required },
      address: { required },
    };
  });

  const v$ = useVuelidate(rules, client);

  const loadClients = async () => {
    store.commit("ui/setLoading", true);
    console.log(pagination.value);
    await store.dispatch("clients/loadClients", { page: currentPage.value, limit: pagination.value.limit });
    store.commit("ui/setLoading", false);
  };

  const filterClients = async (filterTxt) => {
    await store.dispatch("clients/loadClients", {
      filterTxt,
      filterSaldo: filterSaldo.value,
    });
  };

  const getClient = async (id) => {
    store.commit("ui/setLoading", true);
    await store.dispatch("clients/getClient", id);
    store.commit("ui/setLoading", false);
  };

  const createClient = async (data, redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch("clients/createClient", data);
    if (resp.ok) {
      Swal.fire("Completado!", "Cliente creado exitosamente!", "success");
      loadClients();
      if (redirect) {
        router.push({ name: "clients-list" });
      }
    }
  };

  const updateClient = async (client) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const confirmUpdate = await Swal.fire({
      title: "Esta seguro de actualizar el cliente?",
      text: "No se podra revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmUpdate.isConfirmed) {
      const resp = await store.dispatch("clients/updateClient", client);
      if (resp.ok) {
        Swal.fire("Actualizado!", "El cliente a sido actualizado.", "success");
        router.push({ name: "clients-list" });
      }
    }
  };

  const deleteClient = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Esta seguro de eliminar el cliente?",
      text: "No se podra revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      const resp = await store.dispatch("clients/deleteClient", id);
      if (resp.ok) {
        Swal.fire("Eliminado!", "El cliente a sido eliminado.", "success");
        loadClients();
      }
    }
  };

  onMounted(() => {
    store.commit("clients/resetClient");
  });

  return {
    client,
    clients: computed(() => store.getters["clients/getClients"]),
    currentPage,
    filterSaldo,
    totalClients: computed(() => store.getters["clients/getTotalClients"]),
    totalPages: computed(() => store.getters["clients/getClientsPages"]),
    pagination,
    v$,

    createClient,
    deleteClient,
    filterClients,
    getClient,
    loadClients,
    resetClient: () => store.commit("clients/resetClient"),
    updateClient,
  };
};

export default useClients;
