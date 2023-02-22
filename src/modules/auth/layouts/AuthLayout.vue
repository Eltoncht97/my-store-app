<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="
          background-image: url('assets/fondo.png');
        "
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Pukis</h2>

            <p class="max-w-xl mt-3 text-gray-200">
              Mimos para los más peques
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
