<template>
  <h1>Su Reserva Se Realizó Correctamente</h1>

  <div class="container">
    <div class="formulario">
      <label for="">No. Reserva</label>
      <p>{{ numero }}</p>
      <label for="">Fecha de cobro:</label>
      <p>{{ fechaCobro }}</p>
      <label for="">Pago con la tarjeta</label>
      <p>{{ numeroTarjeta }}</p>
      <label for="">Valor cancelado</label>
      <p>{{ valorTotal }}</p>
    </div>
  </div>
  <button @click="inicio">Regresar</button>
</template>

<script>
import { obtenerCobroFachada } from "@/clients/clienteReserva";
export default {
  props: {
    data: {},
  },
  data() {
    return {
      cobro: {
        reserva: null,
        numeroTarjeta: null,
        fecha: null,
      },
      numero: null,
      numeroTarjeta: null,
      valorTotal: null,
      fechaCobro: null,
    };
  },
  mounted() {
    this.cobro = this.data; /* Recibiendo los datos del padre */
    console.log(this.cobro);
    this.numero = this.cobro.reserva.numero;
    this.numeroTarjeta = this.cobro.numeroTarjeta;
    this.valorTotal = this.cobro.reserva.total;
    this.fechaCobro = new Date();
  },
  methods: {
    inicio() {
      this.$router.push({
        path: "/inicio",
      });
    },
    async getCobro() {},
  },
};
</script>

<style scoped>
button {
  width: 10%;
  margin: 25px auto;
  border-radius: 12px;
  cursor: pointer;
  border: none;
}

label {
  font-style: bold;
  text-align: center;
  padding: 8px;
  color: black;
  font-size: 20px;
}
.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 440px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 5px #dd2136;
}
</style>
