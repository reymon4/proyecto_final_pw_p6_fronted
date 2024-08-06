<template>
  <h1>PAGAR LA RESERVACIÓN</h1>
  <label for="">Ingrese su número de tarjeta</label>
  <input type="text" v-model="numeroTarjeta" />
  <button @click="reservar">Pagar</button>
</template>

<script>
/* REcibe las datos del input del componente anterior */
import { reservarFachada } from "@/clients/clienteReserva.js";
/* Tarjeta y el id de reserva*/
import { cobroFachada } from "@/clients/clienteReserva.js";
import { mensaje } from "@/clients/mensaje";
export default {
  props: {
    data: {},
  },
  //DATOS DEL COBRO
  data() {
    return {
      reserva: {
        placa: null,
        cedula: null,
        fechaInicio: null,
        fechaFin: null,
      },
      numeroTarjeta: null,
    };
  },
  mounted() {
    this.reserva = this.data; /* Recibiendo los datos del padre */
    console.log("desde componente formulario pago");
    console.log(this.reserva);
  },
  methods: {
    async reservar() {
      const reservaFinal = await reservarFachada(this.reserva);

      console.log(reservaFinal);
      console.log("Se realizó correctamente la reserva");
      const clienteBody = {
        numeroTarjeta: this.numeroTarjeta,
        reserva: reservaFinal.numero,
        fecha: null,
      };
      const clienteB = {
        numeroTarjeta: this.numeroTarjeta,
        reserva: reservaFinal,
        fecha: null,
      };
      const cobro = await cobroFachada(clienteBody);
      console.log(clienteB);
      this.$emit("ver", clienteB);
    },
  },
};
</script>
<style scoped>
button {
  width: 50%;
  height: 40px;
}
</style>
