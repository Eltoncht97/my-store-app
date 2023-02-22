import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import moment from "moment";

import {
  customAlert,
  customConfirm,
  handleError,
} from "@/utils/customSweetAlerts";
import { paymentMethods } from "../utils/paymentMethods";
import Swal from "sweetalert2";

const useVentas = () => {
  const store = useStore();
  const router = useRouter();

  const isEdit = ref(false);
  const isLoading = ref(false);
  const filter = ref("");
  const product = ref(null);
  const products = computed(() => store.getters["ventas/getProducts"]);

  const venta = ref({
    client: "",
    products: [],
    date: moment().format("yyyy-MM-DD"),
    quantityProduct: 0,
    discountProduct: 0,
    discountValue: 0,
    discount: 0,
    paymentMethod: "",
    subtotal: computed(() =>
      venta.value.products
        .map((p) => p.total)
        .reduce((prev, curr) => prev + curr, 0)
    ),
    total: computed(() => venta.value.subtotal - venta.value.discount),
  });

  const isPDiscountPercentage = ref(false);
  const isDiscountPercentage = ref(false);

  const rules = computed(() => {
    return {
      client: { required },
      date: { required },
      products: { required },
      paymentMethod: { required },
      subtotal: { required, minValue: minValue(1) },
      total: { required, minValue: minValue(1) },
    };
  });

  const v$ = useVuelidate(rules, venta.value);

  const getClients = async () => {
    const resp = await store.dispatch("ventas/getClients");
    if (!resp.ok) {
      handleError(resp);
    }
  };

  const getProducts = async () => {
    const resp = await store.dispatch("ventas/getProducts");
    if (!resp.ok) {
      handleError(resp);
    }
  };

  const createClientVenta = async ( data ) => {
    // if(!isValidForm()) return

    // isLoading.value = true
    const resp = await store.dispatch('ventas/createClient', data)
    if(resp.ok){
      Swal.fire(
        'Completado!',
        'Cliente creado exitosamente!',
        'success'
        )
      // isLoading.value = false
      // loadClients()
    }else {
      customAlert(
        "Error",
        "Hubo un problema al crear el cliente",
        "warning"
      )
    }
    // isLoading.value = false
  }

  const addProduct = () => {
    if (venta.value.products.find((p) => p.id === product.value.id)) {
      resetProduct();
      return customAlert(
        "Producto existente",
        "Ya se agrego un producto con el mismo id, por favor use la opcion de editar si lo necesita",
        "warning"
      );
    }

    const productToAdd = {
      id: product.value.id,
      name: product.value.name,
      price: Math.ceil(product.value.price),
      quantity: venta.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * venta.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        venta.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;

    venta.value.products.push(productToAdd);

    resetProduct();
  };

  const editProduct = (id) => {
    isEdit.value = true;
    const productTable = venta.value.products.find((p) => p.id === id);
    product.value = products.value.find((p) => p.id === id);
    venta.value.quantityProduct = productTable.quantity;
    venta.value.discountProduct = productTable.discount / productTable.quantity;
  };

  const updateProduct = () => {
    const idx = venta.value.products.findIndex(
      (p) => p.id === product.value.id
    );

    const productToAdd = {
      id: product.value.id,
      name: product.value.name,
      price: Math.ceil(product.value.price),
      quantity: venta.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * venta.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        venta.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;
    venta.value.products[idx] = productToAdd;

    resetProduct();
    isEdit.value = false;
  };

  const resetProduct = () => {
    product.value = null;
    venta.value.quantityProduct = null;
    venta.value.discountProduct = 0;
  };

  const resetFormulario = () => {
    venta.value = {
      client: "",
      products: [],
      date: "",
      quantityProduct: null,
      discountProduct: 0,
      discount: 0,
    };
    product.value = null;
  };

  const deleteProduct = (id) => {
    venta.value.products = venta.value.products.filter((p) => p.id !== id);
  };

  const createVenta = async () => {
    if (!isValidForm()) return;

    const resp = await store.dispatch("ventas/createVenta", venta.value);

    if (resp.ok) {
      customAlert("Venta creada exitosamente!", "", "success");
      router.push({ name: "ventas-list" });
    }

    resetFormulario();
  };

  const loadVentas = async () => {
    await store.dispatch("ventas/loadVentas");
  };

  const getVenta = async (id) => {
    await store.dispatch("ventas/getVenta", id);
  };

  const deleteVenta = async (id) => {
    const confirmDelete = await customConfirm(
      "Esta seguro de eliminar la venta?",
      "Se eliminaran todos los productos bajo esta categoria!",
      "Eliminar!"
    );

    if (confirmDelete) {
      const resp = await store.dispatch("ventas/deleteVenta", id);
      if (resp.ok) {
        customAlert("Venta eliminada!", "", "success");
      }
    }
  };

  // onUnmounted(() => {
  //   store.commit('products/resetModule')
  // })

  onMounted(() => {
    store.commit("ventas/resetVenta");
  });

  const calcDiscount = () => {
    if (isDiscountPercentage.value) {
      venta.value.discount = Math.round((venta.value.subtotal * venta.value.discountValue) / 100)
      // venta.value.total =
      //   venta.value.subtotal -
      //   Math.round((venta.value.subtotal * venta.value.discountValue) / 100);
    } else {
      venta.value.discount = venta.value.discountValue
      // venta.value.total = venta.value.subtotal - venta.value.discountValue;
    }
  };

  const isValidForm = () => {
    if (
      !v$.value.client.$invalid &&
      !v$.value.date.$invalid &&
      !v$.value.products.$invalid &&
      !v$.value.subtotal.$invalid &&
      !v$.value.total.$invalid &&
      !v$.value.paymentMethod.$invalid
    ) {
      return true;
    }
    v$.value.$touch();
    return false;
  };

  return {
    //Properties
    clients: computed(() => store.getters["ventas/getClients"]),
    filter,
    isDiscountPercentage,
    isEdit,
    isLoading,
    isPDiscountPercentage,
    paymentMethods,
    product,
    products,
    v$,
    venta,
    ventas: computed(() => store.getters["ventas/getVentas"]),
    ventaShow: computed(() => store.getters["ventas/getVenta"]),

    // Methods
    addProduct,
    calcDiscount,
    createVenta,
    deleteProduct,
    deleteVenta,
    editProduct,
    filterVentas: (filterTxt) => store.commit("ventas/filterVentas", filterTxt),
    getClients,
    getProducts,
    getVenta,
    loadVentas,
    resetVenta: () => store.commit("ventas/resetVenta"),
    toggleDiscountType: () => {
      (isDiscountPercentage.value = !isDiscountPercentage.value)
      calcDiscount()
    },
    togglePDiscountType: () =>
      (isPDiscountPercentage.value = !isPDiscountPercentage.value),
    updateProduct,
    createClientVenta
  };
};

export default useVentas;
