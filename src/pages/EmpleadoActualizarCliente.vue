<template>
  <h1>ACTUALIZE LOS DATOS DE CLIENTE</h1>
  <RegistroCliente class="registro" v-if="this.cedula !== null" tipo="E" funcion="actualizar" :clave="cedula"></RegistroCliente>
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
</style>