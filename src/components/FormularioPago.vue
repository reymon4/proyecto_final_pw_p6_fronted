<template>
  <div class="formulario">
    <h1>Realizar Pago de Reservación</h1>
    <input
      type="text"
      v-model="numeroTarjeta"
      placeholder="Ingrese el número de su tarjeta"
    />
    <button @click="reservar" class="btnPay">Pagar</button>
  </div>
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
.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 90px auto;
  box-shadow: 0px 0px 15px 5px #4d4a4a83;
}
input{
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  font-size: 14px;
}
.btnPay{
  width: 50%;
  height: 40px;
  cursor: pointer;
  border: none;
  margin-top: 65px;
  background-color: #dd2136;
  color: white;
}
</style>
