<template>
<TablaReservar/>
<ClienteReservar/>
<VehiculoReservado/>
</template>

<script>
import TablaReservar from "@/components/TablaReservar.vue";
import ClienteReservar from "@/pages/ClienteReservar.vue";
import VehiculoReservado from "@/components/VehiculoReservado.vue";

export default {
  components: {
    TablaReservar,
    ClienteReservar,
    VehiculoReservado
  },
};
</script>

<style scoped>
</style>