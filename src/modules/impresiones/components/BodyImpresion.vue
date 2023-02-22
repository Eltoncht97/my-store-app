<template>
  <div class="invoice-body">
    <div class="px-2 py-3">
      <!-- tabla de detalle de pago -->
      <div class="relative">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Detalle</th>
              <th scope="col" class="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Pago en efectivo
              </th>
              <td class="px-6 py-4">$40000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- tabla de productos si tiene una venta relacionada -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.invoice-body {
  border-bottom: 3px solid #ffb600;
}
</style>
