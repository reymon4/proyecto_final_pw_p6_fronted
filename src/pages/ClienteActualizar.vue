<template>
  <h1>ACTUALICE SUS DATOS</h1>
  <RegistroCliente
    v-if="this.cedula !== null"
    tipo="C"
    funcion="actualizar"
    :clave="cedula"
  ></RegistroCliente>
</template>


<script>
import { mensaje } from "@/clients/mensaje";
import RegistroCliente from "@/components/FormularioCliente.vue";
export default {
  components: {
    RegistroCliente,
  },
  props: ["dato"],
  data() {
    return {
      cedula: this.dato,
    };
  },
  mounted() {
    console.log(this.dato);
  },
};
</script>

<style scoped>
.registro {
  margin: auto;
  width: 80%;
}

</style>