<template>
  <div class="background">
  <div class="container">
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
        <button @click="guardarCambios()">Guardar Cambios</button>
      </div>
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
}


.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 525px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 25px auto;
  box-shadow: 0px 0px 10px 5px #dd2136;
}

label {
  font-style: bold;
  text-align: left;
  padding: 8px;
  color: black;
}

button {
  width: 50%;
 
  padding: 10px 10px;
  margin: 15px;
  background-color: #dd2136;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 15px;
  
}
button:hover {
  background-color: #58b956;
}

.otros {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  grid-template-rows: repeat(2, 100px); /* Dos filas */
  gap: 10px; /* Espacio entre elementos */
  justify-items: center; /* Centra horizontalmente los elementos en sus celdas */
  margin: 20px auto; /* Centra el contenedor en la página */

}
.item_large {
  grid-column: span 2; /* El elemento ocupa dos columnas */
}
</style>
