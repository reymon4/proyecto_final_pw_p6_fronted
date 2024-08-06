<template>
  <h1>Registre su cuenta Avis</h1>
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
.registro {
  margin: auto;
  width: 80%;
}

</style>