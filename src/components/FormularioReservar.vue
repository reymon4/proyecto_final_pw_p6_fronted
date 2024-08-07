<template>
  <div class="imagenFondo">
    <div class="container">
      <h1>Reservar</h1>
      <div class="formulario">
        <label for="">Placa</label>
        <input type="text" v-model="placa" />
        <label for="">Cédula</label>
        <input type="text" v-model="cedula" />
        <label for="">Fecha de Inicio</label>
        <input type="datetime-local" v-model="fechaInicio" />
        <label for="">Fecha Final</label>
        <input type="datetime-local" v-model="fechaFin" />
        <button @click="reservar" class="btnReservar">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { ElMessageBox } from "element-plus";
import {
  consultarDisponibilidadFachada,
  obtenerReservasPreviasFachada,
} from "@/clients/clienteReserva.js";
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
      var listaReservasPrevias = await obtenerReservasPreviasFachada(
        this.fechaInicio,
        this.fechaFin,
        this.placa
      );
      console.log("FormularioReservar.vue > reservar > listaReservasPrevias: ");
      console.log(listaReservasPrevias);

      if (valor.disponibilidad && listaReservasPrevias.length == 0) {
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
            listaReservasPrevias.pop().fechaFin,
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
  text-align: center;
}
label {
  font-style: bold;
  text-align: left;
}

.item_large {
  grid-column: span 2; /* El elemento ocupa dos columnas */
}

/*
.btnReservar {
  width: 25%;
  padding: 10px 10px;
  margin: 15px;
  background-color: #dd2136;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 15px;
}
*/

.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 200px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 25px auto;
  box-shadow: 0px 0px 15px 5px #4d4a4a83;
}
</style>
