<template>
  <div class="container">
    <h1>Reservar</h1>
    <label for="">Placa</label>
    <input type="text" v-model="placa" />
    <label for="">Cédula</label>
    <input type="text" v-model="cedula" />
    <label for="">Fecha de Inicio</label>
    <input type="datetime-local" v-model="fechaInicio" />
    <label for="">Fecha Final</label>
    <input type="datetime-local" v-model="fechaFin" />
    <button @click="reservar">Guardar</button>
  </div>
</template>

<script scoped>
import { ElMessageBox } from "element-plus";
import { consultarDisponibilidadFachada } from "@/clients/clienteReserva.js";
export default {
  props: {
    placaRecibida: {},
    cedulaRecibida: {},
  },
  data() {
    return {
      placa: null,
      cedula: null,
      fechaInicio: null,
      fechaFin: null,
    };
  },
  mounted() {
    this.placa = this.placaRecibida;
    this.cedula = this.cedulaRecibida;
  },
  methods: {
    async reservar() {
      const clienteBody = {
        cedula: this.cedula,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        placa: this.placa,
      };
      console.log(clienteBody);

      const valor = await consultarDisponibilidadFachada(clienteBody);
      console.log(valor);
      if (valor.disponibilidad) {
        console.log("¡Se puede reservar el vehículo!");
        console.log(clienteBody);
        this.mensaje(
          "Reserva disponible",
          "El valor a cancelar por esta reservación es de $" +
            parseFloat(valor.valorReserva),
          "success"
        );
        console.log("desde formulario reservar ");
        console.log(clienteBody);
        this.$emit("ver", clienteBody);
      } else {
        /* MENSAJE: SELECCIONAR OTRA FECHA PARA RESERVAR */
        this.mensaje(
          "Fecha no disponible",
          "Seleccione otra fecha para reservar. El vehículo se encuentra disponible a partir de " +
            valor.valorReserva,
          "error"
        );
      }
    },
    mensaje(titulo, mensaje, tipo) {
      ElMessageBox.alert(mensaje, titulo, {
        confirmButtonText: "Ok",
        type: tipo,
        position: "center",
        customClass: "messageBox",
        callback: () => {
          // Acciones después de hacer clic en "Aceptar"
          console.log("Mensaje aceptado");
        },
      });
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
}
label {
  font-style: italic;
}
button {
  width: 50%;
  height: 40px;
}

.item_large {
  grid-column: span 2; /* El elemento ocupa dos columnas */
}
</style>
