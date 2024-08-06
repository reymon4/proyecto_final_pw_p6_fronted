<template>
  <h1>SELECCIONE UNA MARCA</h1>
  <div class="buscar">
    <label>Marca:</label>
    <select v-model="marca" id="cars" @change="buscarVehiculo">
      <option v-for="(marc, index) in marcas" :key="index">{{ marc }}</option>
    </select>
  </div>
  <div class="tabla">
    <table v-if="teibol">
      <thead>
        <tr>
          <th>N°</th>
          <th>Placa</th>
          <th>Modelo</th>
          <th>Marca</th>
          <th>Visualizar</th>
          <th>Actualizar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <!-- Utilizamos v-for para iterar sobre la lista de vehículos y generar las filas de la tabla -->
        <tr v-for="(vehiculo, index) in vehiculos" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ vehiculo.placa }}</td>
          <td>{{ vehiculo.modelo }}</td>
          <td>{{ vehiculo.marca }}</td>
          <td><button @click="visualizar(vehiculo)">Visualizar</button></td>
          <td><button @click="actualizar(vehiculo)">Actualizar</button></td>
          <td>
            <button @click="eliminarVehiculo(vehiculo.placa)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Seleccione la marca para mostrar los vehículos disponibles.</p>
  </div>
</template>

<script>
import { mensaje } from "@/clients/mensaje";
import {
  buscarPorMarcaFachada,
  obtenerMarcasFachada,
  eliminarVehiculoFachada,
} from "@/clients/clienteVehiculo.js";
export default {
  data() {
    return {
      marca: null,
      teibol: false,
      vehiculos: [],
      marcas: [],
    };
  },
  mounted() {
    this.obtenerMarcas();
  },
  methods: {
    async obtenerMarcas() {
      var data = await obtenerMarcasFachada();
      this.marcas = data;
      console.log(this.marcas);
    },
    async buscarVehiculo() {
      console.log(this.marca);
      this.vehiculos = await buscarPorMarcaFachada(this.marca);
      this.teibol = this.vehiculos.length > 0;
    },
    async eliminarVehiculo(placa) {
      var data = await eliminarVehiculoFachada(placa);
      console.log(data);
      // Actualizar la lista de vehículos después de eliminar
      mensaje("Eliminando...", data, "error");
      await this.buscarVehiculo();
    },
    actualizar(vehiculo) {
      // Lógica para actualizar el vehículo, por ejemplo: redirigir a una página de actualización con la información del vehículo
      this.$router.push({
        path: "/empleados/vehiculos/actualizar",
        query: { placa: vehiculo.placa },
      });
    },
    visualizar(vehiculo) {
      // Lógica para visualizar el vehículo, por ejemplo: redirigir a una página de visualización con la información del vehículo
      this.$router.push({
        path: "/empleados/vehiculos/visualizar",
        query: { placa: vehiculo.placa },
      });
    },
  },
};
</script>

<style scoped>
/* Estilos para la tabla */
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
