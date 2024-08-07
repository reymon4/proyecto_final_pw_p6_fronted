<template>
  <h1>Seguro Que Quieres Cerrar Sesion</h1>
  <div class="container">
    <button @click="salir">Salir</button>
  </div>
</template>

<script>
import { mensaje } from "@/clients/mensaje";
export default {
  data() {
    return {
      cedula: null,
      contrasenia: null,
      usuario: {
        id: null,
        tipo: null,
      },
    };
  },

  methods: {
    async salir() {
      this.$emit("cambio-tipo", "V");
      this.usuario.id = null;
      this.usuario.tipo = "V";
      mensaje("Sliendo....", "Se volvera a la Pagina de Inicio", "success");
      this.redireccionar();
    },
    redireccionar() {
      this.$router.push({ path: "/inicio", usuario: this.usuario });
    },
  },
};
</script>

<style scoped>
h1 {
  align-items: center;
  font-style: italic;
}
.container {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  justify-content: flex;
  align-items: flex;
}
</style>
