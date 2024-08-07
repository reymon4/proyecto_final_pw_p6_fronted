<template>
  <h1>SELECCIONE UN APELLIDO</h1>
  <div class="buscar">
    <label>Apellido:</label>
    <input type="text" name="" v-model="apellido" />
    <button @click="consultarTodos()" class="btnBuscar">Buscar</button>
  </div>
  <div class="container">
    <div class="image">
      <img :src="imageUrl" alt="Imagen" />
    </div>
  <div class="tabla">
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Cedula</th>
          <th>nombre</th>
          <th>Apellido</th>
          <th>Visualizar</th>
          <th>Actualizar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <!-- Utilizamos v-for para iterar sobre la lista de estudiantes y generar las filas de la tabla -->
        <tr v-for="(cliente, index) in this.clientes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.cedula }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>
            <button @click="visualizar(cliente.cedula)">Visualizar</button>
          </td>
          <td>
            <button @click="actualizar(cliente.cedula)">Actualizar</button>
          </td>
          <td><button @click="eliminar(cliente.cedula)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { mensajeFacade } from "@/clients/mensajeEliminar";
import {
  consultarTodosFachada,
  eliminarFachada,
} from "@/clients/clienteUsuario.js";
export default {
  data() {
    return {
      apellido: null,
      clientes: [],
      imageUrl:
        "https://www.ekathimerini.com/resources/2020-08/avis_photo-thumb-large-thumb-large.jpg",
    };
  },
  methods: {
    async consultarTodos() {
      const data = await consultarTodosFachada(this.apellido);
      this.clientes = data;
    },
    async eliminar(cedula) {
    // Llamar a mensajeFacade para manejar la confirmación y eliminación
    await mensajeFacade("Confirmación", "¿Estás seguro de que deseas eliminar este elemento?", "warning", cedula);
    
    // Después de la eliminación, actualiza la lista de elementos
    await this.consultarTodos();
},
    actualizar(cedula) {
      // Lógica para actualizar el vehículo, por ejemplo: redirigir a una página de actualización con la información del vehículo
      this.$router.push({
        path: "/empleados/clientes/actualizar",
        query: { cedula: cedula },
      });
    },
    visualizar(cedula) {
      // Lógica para visualizar el vehículo, por ejemplo: redirigir a una página de visualización con la información del vehículo
      this.$router.push({
        path: "/empleados/clientes/visualizar",
        query: { cedula: cedula },
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  height: 50vh;
}
.image {
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tabla table {
  width: 25%;
  border-collapse: collapse;
}

.tabla th,
.tabla td {
  padding: 35px;
  margin: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

.tabla tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tabla tr:hover {
  background-color: #b6b0b0;
}
label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  font-size: 15px;
  padding: 12px;
}
input {
  padding: 5px;
  border-radius: 10px;
  border: 2px solid #1a1919;
}
.btnBuscar {
  background-color: #dd2136;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 15px;
  cursor: pointer;
}	

</style>