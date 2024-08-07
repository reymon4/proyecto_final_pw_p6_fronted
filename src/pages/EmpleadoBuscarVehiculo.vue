<template>
  <h1>Seleccione una Marca</h1>
  <div class="buscar">
    <label>Marca:</label>
    <select v-model="marca" id="cars" @change="buscarVehiculo">
      <option v-for="(marc, index) in marcas" :key="index">{{ marc }}</option>
    </select>
  </div>
  <div class="container">
    <div class="image">
      <img :src="imageUrl" alt="Imagen" />
    </div>
  <div class="tabla">
    <table v-if="teibol">
      <thead>
        <tr>
          <th>N°</th>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
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
          <td><button @click="visualizar(vehiculo)" class="buttonVisu">Visualizar</button></td>
          <td><button @click="actualizar(vehiculo)" class="buttonActualizar">Actualizar</button></td>
          <td>
            <button @click="eliminarVehiculo(vehiculo.placa)" class="buttonDelete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Seleccione la marca para mostrar los vehículos disponibles.</p>
  </div>
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
      imageUrl:
        "https://goingawesomeplaces.com/wp-content/uploads/2020/07/avis-preferred-customer-booth.jpg",
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
.container {
 display: grid;
 grid-template-columns:0.5fr 1fr;
 height: 50vh;
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
select {
  padding: 8px;
  margin-bottom: 15px;
  width: 200px;
  border-radius: 5px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  font-size: 14px;
}
select:focus {
  outline: none;
  border-color: #666;
}
.tabla table {
  width: 25%;
  border-collapse: collapse;
}

.tabla th,
.tabla td {
  padding: 15px;
  margin: 10px;
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
.buttonVisu{
  background-color: #6aad78;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.buttonActualizar{
  background-color: #adac6a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.buttonDelete {
  background-color: #dd2136;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
