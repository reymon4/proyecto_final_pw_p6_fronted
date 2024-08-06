<template>
  <h1>Ingrese los siguientes datos</h1>
  <RegistroVehiculo class="registro" funcion="insertar"></RegistroVehiculo>
</template>


<script>
import { mensaje } from "@/clients/mensaje";
import RegistroVehiculo from "@/components/FormularioVehiculo.vue";
export default {
  components: {
    RegistroVehiculo,
  },
};
</script>

<style scoped>
.registro {
  margin: auto;
  width: 80%;
}
</style>