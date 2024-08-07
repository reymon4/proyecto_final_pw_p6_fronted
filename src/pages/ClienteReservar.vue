<template>
  
  <div class="container">
    <div class="image">
      <img :src="imageUrl" alt="Imagen" />
    </div>
    <FormularioReservarVue v-if="formRes" @ver="actualizarForm" :placaRecibida="this.placa" :cedulaRecibida="dato"> </FormularioReservarVue>
    <FormularioPagoVue v-if="formPay" @ver="actualizarPay" :data="clienteBody"></FormularioPagoVue>
    <DetallesPagoVue v-if="detaPay"  @ver="actualizarDetalle" :data="clienteBody"></DetallesPagoVue>
  </div>
</template>

<script>
import { mensaje } from "@/clients/mensaje";
import DetallesPagoVue from "@/components/DetallesPago.vue";
import FormularioPagoVue from "@/components/FormularioPago.vue";
import FormularioReservarVue from "@/components/FormularioReservar.vue";
export default {
  props: ["dato"],
  components: {
    DetallesPagoVue,
    FormularioPagoVue,
    FormularioReservarVue,
  },
  mounted(){
    this.placa=this.$route.query.placa,
    this.cedula = this.dato,
    console.log(this.placa)
  },
  data() {
    return {
      placa: this.$route.query.placa,
      formRes: true,
      formPay: false,
      detaPay: false,
      clienteBody:null,
      cobro: null,
      imageUrl:"https://scontent.fuio10-2.fna.fbcdn.net/v/t39.30808-6/331688762_1231521437722123_2043906035019483408_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ALK38zxnXecQ7kNvgEbBc8v&_nc_ht=scontent.fuio10-2.fna&oh=00_AYAZtW8gN4IcTDdGBskWJXbBRVl7XSczVWwwwaeyiKQ3ag&oe=66B99BBB"

    };
  },
  methods: {
    actualizarForm(data) {
      this.clienteBody=data;
      this.formRes = false;
      this.formPay = true;
    },
    actualizarPay(data) {
      this.clienteBody=data;
      this.formPay = false;
      this.detaPay = true;
    },
    actualizarDetalle(data) {
      this.clienteBody=data;
      this.formPay = false;
      this.detaPay = true;
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}
.image {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
