<template>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inicio</title>
  </head>
  <body>
    <div class="container">
      <header>
        <img
          id="logo"
          src="https://wearekrabi.com/wp-content/uploads/2021/07/Avis-Rent-A-car-logo-Yanin-Swangdee-scaled.jpg"
          alt="Cannot access to resource"
          @click="inicio"
        />

        <navBar id="idNavBar" :tipo="tipo" />
      </header>

      <router-view
        @cambioTipo="actualizarTipo"
        @cambioCedula="actualizarCedula"
        :dato="cedula"
        :sinRese="tipo"
      />

      <footer>
        <h1>© Programación Web 2024-2024</h1>
        <h2>
        Avis Rent a Car System, LLC. Todos los derechos reservados.
        </h2>
        <h2>
          Síganos:
          <a
            href="https://www.facebook.com/avis"
            style="color: #fff; text-decoration: none"
            >Facebook</a
          >
          |
          <a
            href="https://twitter.com/Avis"
            style="color: #fff; text-decoration: none"
            >Twitter</a
          >
          |
          <a
            href="https://www.instagram.com/avis"
            style="color: #fff; text-decoration: none"
            >Instagram</a
          >
        </h2>
      </footer>
    </div>
  </body>
</template>

<script>
import navBar from "@/components/NavBar.vue";
import router from "@/router/router";
export default {
  name: "App",
  components: {
    navBar,
    router,
  },
  data() {
    return {
      tipo: "V",
      cedula: null,
    };
  },
  updated() {},
  methods: {
    actualizarTipo(nuevoTipo) {
      console.log("desde la app.vue " + nuevoTipo);
      this.tipo = nuevoTipo;
    },
    actualizarCedula(cedulaNueva) {
      console.log("desde la app.vue " + cedulaNueva);
      this.cedula = cedulaNueva;
    },
    inicio() {
      this.$router.push({ path: "/inicio" });
    },
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
body,html{
  margin: 0%;
}

#logo {
  width: 10%;
}

.home {
  margin-right: auto;
}

.container {
  /*margin-bottom: 100px;*/
}

button {
  padding: auto;
  background: #dd2136;
  color: white;
  line-height: 150%;
  font-size: 3vmin;
  font-style: bold;
  border: #dd2136;
  margin: auto;
}

header {
  background: #dd2136;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

footer {
  width: 100%;
  background: #2222226e;
  color: #c7c7c7;
  font-size: 1vmin;
  text-transform: uppercase;
  /*  position: fixed;*/
  bottom: 10px;
}
#idNavBar {
  width: 90%;
  text-align: left;
}

.router {
  background: blue;
}

/* estilos tabla Generales*/
.tabla {
  margin-top: 20px;
  display: grid;
  width: 100%;
  border-collapse: collapse;
  justify-content: center;
}
/* Estilos para las celdas de encabezado */
.tabla th {
  background-color: #4b3f53;
  /*   border: 1px solid #dddddd; */
  padding: 8px;
  text-align: left;
  color: #f1bf57;
}

/* Estilos para las celdas de datos */
.tabla td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

/* Estilos para las filas impares */
.tabla tr:nth-child(odd) {
  background-color: #f9f9f9;
}

/* Bordes redondos para la tabla */
.tabla {
  border-radius: 10px;
  overflow: hidden;
}
</style>
