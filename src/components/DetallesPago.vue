<template>
 

  <div class="container">
    <div class="formulario">
      <h1>Reserva realizada con Exito</h1>
      <label for="">No. Reserva</label>
      <p>{{ numero }}</p>
      <label for="">Fecha de cobro:</label>
      <p>{{ fechaCobro }}</p>
      <label for="">Pago con la tarjeta</label>
      <p>{{ numeroTarjeta }}</p>
      <label for="">Valor cancelado</label>
      <p>{{ valorTotal }}</p>
      <button @click="inicio">Regresar</button>
    </div>
  </div>
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
  width: 50%;
  padding: 3%;
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
  height: 550px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 30px 200px;
  box-shadow: 0px 0px 15px 5px #4d4a4a83;
}
</style>
