<template>
  <h1>VISUALIZAR CLIENTE</h1>
  <RegistroCliente class="registro" v-if="this.cedula !== null" tipo="C" funcion="visualizar" :clave="cedula"></RegistroCliente>
</template>


<script>
import { mensaje } from "@/clients/mensaje";
import RegistroCliente from "@/components/FormularioCliente.vue";
export default {
  components: {
    RegistroCliente,
  },

  data() {
    return {
        cedula: this.$route.query.cedula,
    };
  },
  beforeCreate() {
    this.cedula = this.$route.query.cedula;
    console.log(this.cedula)
  },
};
</script>

<style scoped>
.registro {
  margin: auto;
  width: 80%;
}

button{
    width: 50%;
  height: 40px;
}
</style>