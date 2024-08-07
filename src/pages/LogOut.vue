<template>
  <h1>Seguro Que Quieres Cerrar Sesion</h1>
  <div class="image">
    <img
      src="https://scontent.fuio10-1.fna.fbcdn.net/v/t39.30808-6/274130723_961167041206895_5176365009051397372_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t27LX-LE2_UQ7kNvgFVhSen&_nc_ht=scontent.fuio10-1.fna&oh=00_AYC6b5d7TT3kjBOWfDo2MbqNrxP6d1dbnpszEcoXPWN5nA&oe=66B98BD5"
      alt="Imagen"
    />
  </div>
  <div class="container">
    <button @click="salir" class="btnSalir">Salir</button>
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
      mensaje("Saliendo....", "Se volvera a la Pagina de Inicio", "success");
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
  font-style: bold;
}
.container {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  justify-content: flex;
  align-items: flex;
}
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.image img {
  width: 25%;
  object-fit: cover;
}
.btnSalir {
  width: 10%;
  padding: 1%;
  border-radius: 12px;
  cursor: pointer;
}
</style>
