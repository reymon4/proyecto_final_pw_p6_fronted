<template>
  <h1>Formulario de Registro</h1>
  <RegistroCliente
    class="registro"
    tipo="C"
    funcion="insertar"
  ></RegistroCliente>
</template>


<script>
import { mensaje } from "@/clients/mensaje";
import RegistroCliente from "@/components/FormularioCliente.vue";
export default {
  components: {
    RegistroCliente,
  },
};
</script>

<style scoped>


</style>