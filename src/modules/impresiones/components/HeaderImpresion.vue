<template>
  <div class="invoice-header pt-3 pb-0 px-2">
    <div class="flex flex-row justify-between">
      <div class="basis-6/12">
        <div class="flex flex-row justify-start content-center">
          <div class="col rounded border-ranz p-2">
            <h3 class="m-0 text-center card-title">Pukis</h3>
          </div>
        </div>
        <div class="row my-3">
          <div class="col text-left text-sm no-decorate">
            Corral de Bustos<br />
            Direccion 1234<br />
            <span>4211231</span>
            <span> - 3413864166</span><br />
            pukis@gmail.com
          </div>
        </div>
      </div>
      <div class="basis-5/12 mx-4">
        <div class="flex flex-row justify-end content-center">
          <div class="col rounded border-ranz p-2">
            <h3 class="m-0 text-center card-title">Cliente</h3>
          </div>
        </div>
        <div class="row my-3">
          <div class="col text-right text-sm no-decorate">
            Elton Chavez TP<br />
            Direccion 1421<br />
            <span>4211255</span>
            <span> - 3413864166</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.logo {
  max-width: 70%;
}
.no-decorate {
  text-transform: none;
}
.border-ranz {
  border: 1px solid #ffb600;
}
.invoice-header {
  border-bottom: 3px solid #ffb600;
}
</style>
