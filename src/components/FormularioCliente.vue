<template>
  <div class="container">
    <div class="image">
      <img :src="imageUrl" alt="Imagen" />
    </div>
    <div class="formulario">
      <label for="">Cédula</label>
      <input v-if="funcion === 'insertar'" type="text" v-model="cedula" />
      <input
        v-else
        type="text"
        v-model="cedula"
        :disabled="this.funcion === 'visualizar' || this.tipo === 'C'"
      />

      <label for="">Nombre</label>
      <input v-if="funcion === 'insertar'" type="text" v-model="nombre" />
      <input
        v-else
        type="text"
        v-model="nombre"
        :disabled="this.funcion == 'visualizar'"
      />

      <label for="">Apellido</label>
      <input v-if="funcion === 'insertar'" type="text" v-model="apellido" />
      <input
        v-else
        type="text"
        v-model="apellido"
        :disabled="this.funcion == 'visualizar'"
      />

      <label for="">Fecha de nacimiento</label>
      <input
        v-if="funcion === 'insertar'"
        type="datetime-local"
        v-model="fechaNacimiento"
      />
      <input
        v-else
        type="datetime-local"
        v-model="fechaNacimiento"
        :disabled="this.funcion == 'visualizar'"
      />

      <label for="">Género</label>
      <input v-if="funcion === 'insertar'" type="text" v-model="genero" />
      <input
        v-else
        type="text"
        v-model="genero"
        :disabled="this.funcion == 'visualizar'"
      />

      <label for="">Contraseña</label>
      <input
        v-if="funcion === 'insertar'"
        type="password"
        v-model="contrasenia"
      />
      <input
        v-else
        type="password"
        v-model="contrasenia"
        :disabled="this.funcion == 'visualizar'"
      />

      <div v-if="funcion === 'insertar'" class="guardado">
        <h6>Lea nuestros términos y condiciones</h6>
        <button @click="guardar">Guardar</button>
      </div>
      <div v-if="funcion === 'visualizar'" class="otros">
        <h6 class="item_large">Lea nuestros términos y condiciones</h6>
        <button v-if="tipo === 'C'" @click="inicio()">Volver</button>
        <button v-else @click="volver()">Volver</button>
        <button @click="actualizar()">Actualizar</button>
      </div>
      <div v-if="funcion === 'actualizar'" class="otros">
        <h6 class="item_large">Lea nuestros términos y condiciones</h6>
        <button v-if="tipo === 'C'" @click="inicio()">Volver</button>
        <button v-else @click="volver()">Volver</button>
        <button @click="guardarCambios()" class="btnActulizar">Guardar Cambios</button>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mensaje } from "@/clients/mensaje";
import {
  registrarFachada,
  consultarFachada,
  actualizarFachada,
} from "@/clients/clienteUsuario.js";
export default {
  props: {
    tipo: {
      type: String,
      required: true,
    },
    clave: {
      type: String,
    },
    funcion: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.handleData();
  },
  data() {
    return {
      cedula: null,
      nombre: null,
      apellido: null,
      fechaNacimiento: null,
      contrasenia: null,
      genero: null,
      registro: null,
      imageUrl:
        "https://scontent.fuio10-1.fna.fbcdn.net/v/t1.6435-9/94199014_2449597351808365_7344174148064641024_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=0327a3&_nc_ohc=L9hXpcrB9UoQ7kNvgFHdxIV&_nc_ht=scontent.fuio10-1.fna&oh=00_AYAmHD7tX-coq4-VEznNPGDkRTwagWllZzFO4IOrSfTdLQ&oe=66DB275F",
    };
  },
  methods: {
    async handleData() {
      if (this.funcion === "visualizar" || this.funcion === "actualizar") {
        var data = await consultarFachada(this.clave);
        console.log(data.nombre);
        this.cedula = this.clave;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.genero = data.genero;
        this.fechaNacimiento = data.fechaNacimiento;
        this.contrasenia = data.password;
        this.registro = data.registro;
      }
    },
    async guardar() {
      /* VERIFICAR LOS ATRIBUTOS EN EL BACK END */
      const clienteBody = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        genero: this.genero,
        fechaNacimiento: this.fechaNacimiento,
        password: this.contrasenia,
        /* VERIFICAR EL TIPO */
        registro: this.tipo,
      };
      var verificar = (await consultarFachada(this.cedula)) !== "";
      console.log(verificar);
      if (verificar) {
        mensaje("Error....", "La cedula ya existe en el sistema", "error");
        this.refrescar();
      } else {
        // INSERTA
        await registrarFachada(clienteBody);
        mensaje("Exito....", "Se ha guardado correctamente", "success");
        this.refrescar();
        console.log("¡Se registró el cliente!");
      }
    },
    async guardarCambios() {
      const clienteBody = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        genero: this.genero,
        fechaNacimiento: this.fechaNacimiento,
        password: this.contrasenia,
        /* VERIFICAR EL TIPO */
        registro: this.registro,
      };
      var data = await actualizarFachada(clienteBody.cedula, clienteBody);
      mensaje("Actualizando....", "Se ha Actualizado Correctamente", "success");
      if (this.tipo === "C") {
        this.inicio();
      } else {
        this.visualizar(this.cedula);
      }
    },

    volver() {
      this.$router.push({ path: "/empleados/clientes" });
    },
    inicio() {
      this.$router.push({ path: "/inicio" });
    },
    actualizar() {
      // Lógica para actualizar el vehículo, por ejemplo: redirigir a una página de actualización con la información del vehículo
      this.$router.push({
        path: "/empleados/clientes/actualizar",
        query: { cedula: this.cedula },
      });
    },
    visualizar(cedula) {
      // Lógica para visualizar el vehículo, por ejemplo: redirigir a una página de visualización con la información del vehículo
      this.$router.push({
        path: "/empleados/clientes/visualizar",
        query: { cedula: cedula },
      });
    },
    refrescar() {
      this.cedula = null;
      this.nombre = null;
      this.apellido = null;
      this.fechaNacimiento = null;
      this.contrasenia = null;
      this.genero = null;
    },
  },
};
</script>

<style scoped>
.container {
 display: grid;
 grid-template-columns:1fr 1fr;
 height: 100vh;
}
.image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 600px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 5px 35px;
  margin: 25px auto;
  margin: 65px auto;
  box-shadow: 0px 0px 10px 5px #4d4a4a83;
}

label {
  font-style: bold;
  text-align: left;
  padding: 8px;
  color: black;
}
input {
  padding: 4px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 60%;
  height: 50px;
  cursor: pointer;
  border: none;
  background-color: #dd2136;
  color: white;
}
.btnActulizar {
  background-color: #1c0fcf;
}	

.otros {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  grid-template-rows: repeat(1, 50px); /* Dos filas */
  gap: 10px; /* Espacio entre elementos */
  justify-items: center; /* Centra horizontalmente los elementos en sus celdas */
  /*margin: 20px auto;*/ /* Centra el contenedor en la página */
}
.item_large {
  grid-column: span 2; /* El elemento ocupa dos columnas */
}
</style>
