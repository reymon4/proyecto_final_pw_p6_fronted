<template>
  <div class="container">
    <hr />
    <label for="">Placa</label>
    <input type="text" v-model="placa" />
    <label for="">Modelo</label>
    <input type="text" v-model="modelo" />
    <label for="">Marca</label>
    <input type="text" v-model="marca" />
    <label for="">Año</label>
    <input type="text" v-model="anio" />
    <label for="">País</label>
    <input type="text" v-model="pais" />
    <label for="">Cilindraje</label>
    <input type="text" v-model="cilindraje" />
    <label for="">Avalúo</label>
    <input type="number" v-model="avaluo" />
    <label for="">Valor diario</label>
    <input type="number" v-model="valorDia" />
    <label for="">Estado</label>
    <input type="text" v-model="estado" />

    <button @click="guardar">Guardar</button>
  </div>
</template>

<script scoped>
import { mensaje } from "@/clients/mensaje";
import {registrarFachada} from '@/clients/clienteVehiculo.js'
export default {
  data() {
    return {
      placa: null,
      modelo: null,
      marca: null,
      anio: null,
      pais: null,
      cilindraje: null,
      avaluo: null,
      valorDia: null,
      estado: null,
    };
  },

  methods: {
    async guardar() {
      /* VERIFICAR LOS ATRIBUTOS EN EL BACK END */
      const carBody = {
        placa: this.placa,
        modelo: this.modelo,
        marca: this.marca,
        anio: this.anio,
        pais: this.pais,
        cilindraje: this.cilindraje,
        avaluo: this.avaluo,
        valorDia: this.valorDia,
        estado: this.estado
      };

      await registrarFachada(carBody);
      console.log("¡Se registró el automóvil!");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
input {
  width: 100%;
}
label {
  font-style: italic;
}
.guardado {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
}
</style>
