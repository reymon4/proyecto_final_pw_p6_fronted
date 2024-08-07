<template>
  <h1>ACTUALIZE LOS DATOS DE VEHICULO</h1>
  <RegistroVehiculo class="registro" v-if="this.placa !== null" funcion="actualizar" :clave="placa"></RegistroVehiculo>
</template>


<script>
import { mensaje } from "@/clients/mensaje";
import RegistroVehiculo from "@/components/FormularioVehiculo.vue";
export default {
  components: {
    RegistroVehiculo,
  },

  data() {
    return {
       
        placa: this.$route.query.placa,

        
    };
  },
  beforeCreate() {
    this.placa = this.$route.query.placa;
    console.log(this.placa)
  },
};
</script>

<style scoped>
.registro {
  margin: auto;
  width: 100%;
}
</style>