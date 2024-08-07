<template>
  <div class="container">
    <label>N° de reserva</label>
    <input
      v-model="reserva"
      type="number"
      placeholder="Ingrese el número de reserva"
    />
    <hr />
    <button @click="buscar">Buscar</button>
    <div v-if="crear">
      <label for="">Placa</label>
      <p>{{ placa }}</p>
      <label for="">Modelo</label>
      <p>{{ modelo }}</p>
      <label for="">Estado</label>
      <p>{{ estado }}</p>
      <label for="">Desde</label>
      <p>{{ fechaInicio }}</p>
      <label for="">Hasta</label>
      <p>{{ fechaFin }}</p>
      <label for="">Reservado por</label>
      <p>{{ cedula }}</p>
      <button class="idRetirar" @click="retirar">Retirar</button>
    </div>
  </div>
</template>

<script>
import {
  retirarVehiculoReservadoFachada,
  obtenerReservaFachada,
} from "@/clients/clienteReserva";
import { mensaje } from "@/clients/mensaje";
export default {
  data() {
    return {
      reserva: null,
      placa: null,
      modelo: null,
      cedula: null,
      fechaInicio: null,
      fechaFin: null,
      estado: null, // si esta disponible o no el vehículo
      retiro: null, //fecha en la que se retira el vehículo reservado
      crear: false,
    };
  },

  methods: {
    async buscar() {
      if (this.reserva === null || this.reserva === "") {
        mensaje("Retiro", "No ha ingresado el número de reserva", "error");
      } else {
        var data = await obtenerReservaFachada(this.reserva);
        if (data.cedula !== undefined) {
          console.log(data);
          if (data !== undefined) {
            this.placa = data.placa;
            this.modelo = data.modelo;
            this.fechaInicio = data.fechaInicio;
            this.fechaFin = data.fechaFin;
            this.cedula = data.cedula;
            this.estado = data.estado;
            this.crear = true;
          }
        } else {
          mensaje(
            "Retiro",
            "El número de reserva ingresado no existe",
            "error"
          );
        }
      }
    },
    async retirar() {
      var data = await retirarVehiculoReservadoFachada(this.reserva);
      if (data.includes("EXITO")) {
        mensaje("Retiro", "Se ha ejecutado el retiro exitosamente", "success");
      } else {
        mensaje("Retiro", data, "error");
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  border-radius: 10px;
  text-align: center;
}
p,
label {
  font-size: 2vmin;
  font-style: bold;
  border-radius: 15px;
  background: #9b9b9b;
  width: 100%;
  line-height: 150%;
  box-sizing: content-box;
  color: black;
  border-radius: 10px;
}
label {
  background: white;
  color: black;
}
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.idRetirar {
  line-height: 150%;
  width: 45%;
}
button {
  width: 50%;
  height: 40px;
}
</style>
