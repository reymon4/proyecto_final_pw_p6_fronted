<template>
  <h1>SU RESERVA SE REALIZÓ CORRECTAMENTE</h1>
  <div class="container">
    <label for="">No. Reserva</label>
    <p>{{ numero }}</p>
    <label for="">Fecha de cobro:</label>
    <p>{{ fechaCobro }}</p>
    <label for="">Pago con la tarjeta</label>
    <p>{{ numeroTarjeta }}</p>
    <label for="">Valor cancelado</label>
    <p>{{ valorTotal }}</p>
  </div>
  <button @click="inicio">Regresar</button>
</template>

<script>
import { obtenerCobroFachada } from '@/clients/clienteReserva';
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
    async getCobro(){
   

    }
  },
};
</script>

<style scoped>
button{
    width: 50%;
  height: 40px;
}</style>
