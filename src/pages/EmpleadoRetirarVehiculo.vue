<template>
  <h1>¿TIENE RESERVA?</h1>
  <button @click="reserva()">Reserva</button>
  <button @click="sinReservar()">Sin reserva</button>
  <VehiculoReservado v-if="conReserva" />
  <RetirarSinReserva v-if="sinReserva" />
</template>

<script>
import { mensaje } from "@/clients/mensaje";
import VehiculoReservado from "@/components/VehiculoReservado.vue";
import RetirarSinReserva from "@/components/RetirarSinReserva.vue";
export default {
  components: {
    VehiculoReservado,
    RetirarSinReserva,
  },
  data() {
    return {
      conReserva: false,
      sinReserva: false,
    };
  },

  methods: {
    reserva() {
      this.conReserva = true;
      this.sinReserva = false;
      console.log(this.conReserva);
      console.log(this.sinReserva);
    },
    sinReservar() {
      this.conReserva = false;
      this.sinReserva = true;
            console.log(this.conReserva);
      console.log(this.sinReserva);

    },
  },
};
</script>

<style scoped>
.registro {
  margin: auto;
  width: 80%;
}

button{
  margin: 10px;
}
</style>