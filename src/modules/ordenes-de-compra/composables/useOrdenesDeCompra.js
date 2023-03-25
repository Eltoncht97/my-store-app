import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
import useVuelidate from "@vuelidate/core";

import { customAlert } from "@/utils/customSweetAlerts";
import { isValidForm } from "@/utils/isValidForm";
import { getIVAValue } from "@/utils/getIvaValue";
import { ordenDeCompraRules } from "../utils/ordenDeCompraRules";
import { errorAlert } from "@/utils/customAlerts";

const useOrdenesDeCompra = () => {
  const store = useStore();
  const router = useRouter();

  const product = ref(null);
  const isEdit = ref(false);
  const isPDiscountPercentage = ref(false);

  const pagination = computed(() => store.getters["ui/getPagination"]);

  const ordenesDeCompra = computed(
    () => store.getters["ordenesDeCompra/getOrdenesDeCompra"]
  );

  const ordenDeCompra = computed(
    () => store.getters["ordenesDeCompra/getOrdenDeCompra"]
  );

  const products = computed(() => store.getters["ventas/getProducts"]);

  const productToAdd = ref({
    cantidad: 1,
    descuentoValue: 0,
    descuento: 0,
    subtotal: computed(() => product.value && calcSubtotalProduct()),
    iva: "IVA 21",
  });

  const ingreso = ref({
    proveedor: null,
    products: [],
    factura: "",
    date: moment().format("yyyy-MM-DD"),
    discountValue: null,
    discount: 0,
    subtotal: computed(() =>
      ingreso.value.products
        .map((p) => p.total)
        .reduce((prev, curr) => prev + curr, 0)
    ),
    total: computed(() => ingreso.value.subtotal - ingreso.value.discount),
  });

  const rules = computed(() => ordenDeCompraRules);

  const v$ = useVuelidate(rules, ingreso.value);

  const loadOrdenesDeCompra = async ({
    isFilter = false,
    limited = true,
  } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });

    const { ok, message, totalItems } = await store.dispatch(
      "ordenesDeCompra/getOrdenesDeCompra",
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

  const loadOrdenDeCompra = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "ordenesDeCompra/getOrdenDeCompra",
      id
    );
    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const togglePDiscountType = () => {
    isPDiscountPercentage.value = !isPDiscountPercentage.value;
    calcDiscountProduct();
  };

  const calcSubtotalProduct = () => {
    calcDiscountProduct();
    return (
      product.value.costWithoutIva * productToAdd.value.cantidad -
      productToAdd.value.descuento * productToAdd.value.cantidad
    );
  };

  const calcDiscountProduct = () => {
    if (isPDiscountPercentage.value) {
      productToAdd.value.descuento = Math.round(
        (product.value.costWithoutIva * productToAdd.value.descuentoValue) / 100
      );
    } else {
      productToAdd.value.descuento = productToAdd.value.descuentoValue;
    }
  };

  const calcImpuestosProduct = (subtotal, discount, ivaType) => {
    const p = subtotal - discount;
    return (p * getIVAValue(ivaType)) / 100;
  };

  const resetProduct = () => {
    product.value = null;
    productToAdd.value = {
      cantidad: 1,
      descuentoValue: 0,
      descuento: 0,
      subtotal: computed(() => product.value && calcSubtotalProduct()),
    };
  };

  const resetFormulario = () => {
    ingreso.value = {
      proveedor: "",
      products: [],
      date: "",
      discount: 0,
    };
    product.value = null;
  };

  const addProduct = () => {
    if (ingreso.value.products.find((p) => p.id === product.value.id)) {
      resetProduct();
      return customAlert(
        "Producto existente",
        "Ya se agrego un producto con el mismo id, por favor use la opcion de editar si lo necesita",
        "warning"
      );
    }

    const productAdd = {
      id: product.value.id,
      name: product.value.name,
      price: product.value.costWithoutIva,
      quantity: productToAdd.value.cantidad,
      iva: product.value.ivaType,
      subtotal: productToAdd.value.cantidad * product.value.costWithoutIva,
      discount: productToAdd.value.descuento * productToAdd.value.cantidad,
    };

    productAdd.impuestos = calcImpuestosProduct(
      productAdd.subtotal,
      productAdd.discount,
      productAdd.iva
    );
    productAdd.total =
      productAdd.subtotal - productAdd.discount + productAdd.impuestos;
    ingreso.value.products.push(productAdd);

    resetProduct();
  };

  const editProduct = (id) => {
    isEdit.value = true;
    const productTable = ingreso.value.products.find((p) => p.id === id);
    product.value = products.value.find((p) => p.id === id);
    product.value.costWithoutIva = productTable.price;
    productToAdd.value.cantidad = productTable.quantity;
    productToAdd.value.descuentoValue =
      productTable.discount / productTable.quantity;
    productToAdd.value.iva = productTable.iva;
    calcDiscountProduct();
  };

  const updateProduct = () => {
    const idx = ingreso.value.products.findIndex(
      (p) => p.id === product.value.id
    );

    const productToUpdate = {
      id: product.value.id,
      name: product.value.name,
      price: product.value.costWithoutIva,
      quantity: productToAdd.value.cantidad,
      iva: product.value.ivaType,
      subtotal: productToAdd.value.cantidad * product.value.costWithoutIva,
      discount: productToAdd.value.descuento * productToAdd.value.cantidad,
    };

    productToUpdate.impuestos = calcImpuestosProduct(
      productToUpdate.subtotal,
      productToUpdate.discount,
      productToUpdate.iva
    );
    productToUpdate.total =
      productToUpdate.subtotal -
      productToUpdate.discount +
      productToUpdate.impuestos;
    ingreso.value.products[idx] = productToUpdate;

    resetProduct();
    isEdit.value = false;
  };

  const deleteProduct = (id) => {
    ingreso.value.products = ingreso.value.products.filter((p) => p.id !== id);
  };

  const createIngreso = async () => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch(
      "ordenesDeCompra/createIngreso",
      ingreso.value
    );

    if (resp.ok) {
      customAlert("Orden de compra creada exitosamente!", "", "success");
      router.push({ name: "ordenes-de-compra-list" });
    }

    resetFormulario();
  };

  const loadInformeCompras = async (dates) => {
    const formatedDates = { ...dates };
    formatedDates.startDate = `${moment(formatedDates.startDate).format(
      "MM-DD-YYYY"
    )}T00:00:00Z`;
    formatedDates.endDate = `${moment(formatedDates.endDate).format(
      "MM-DD-YYYY"
    )}T23:59:59Z`;
    await store.dispatch("ordenesDeCompra/getInformeCompras", formatedDates);
  };

  return {
    ingreso,
    isEdit,
    isPDiscountPercentage,
    ordenDeCompra,
    ordenesDeCompra,
    product,
    productToAdd,
    v$,
    informeData: computed(() => store.getters["ordenesDeCompra/getInformeData"]),
    totalComprasInforme: computed(() => store.getters["ordenesDeCompra/getTotalComprasInforme"]),

    addProduct,
    createIngreso,
    deleteProduct,
    editProduct,
    loadOrdenDeCompra,
    loadOrdenesDeCompra,
    resetFormulario,
    togglePDiscountType,
    updateProduct,
    loadInformeCompras,
  };
};

export default useOrdenesDeCompra;
