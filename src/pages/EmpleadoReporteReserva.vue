<template>
  <h1>SELECCIONE LAS FECHAS</h1>
  <div class="buscar">
    <label>Fecha inicio:</label>
    <input type="datetime-local" v-model="fechaInicio" />
    <label>Fecha Fin:</label>
    <input type="datetime-local" v-model="fechaFin" @change="buscar" />
  </div>
  <div class="tabla">
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Numero Reserva</th>
          <th>SubTotal</th>
          <th>Estado Reserva</th>
          <th>Iva</th>
          <th>Total</th>
          <th>CedulaCliente</th>
          <th>Apellido Cliente</th>
          <th>Hobbie</th>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
        </tr>
      </thead>
      <tbody>
        <!-- Utilizamos v-for para iterar sobre la lista de vehículos y generar las filas de la tabla -->
        <tr v-for="(reserva, index) in reservas" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ reserva.numero }}</td>
          <td>{{ reserva.subtotal }}</td>
          <td>{{ reserva.estado }}</td>
          <td>{{ reserva.iva }}</td>
          <td>{{ reserva.total }}</td>
          <td>{{ reserva.cedula }}</td>
          <td>{{ reserva.apellido }}</td>
          <td>{{ reserva.hobbie }}</td>
          <td>{{ reserva.placa }}</td>
          <td>{{ reserva.marca }}</td>
          <td>{{ reserva.modelo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mensaje } from "@/clients/mensaje";
import { obtenerReporteReservasFachada } from "@/clients/clienteReserva";
export default {
  data() {
    return {
      fechaInicio: null,
      fechaFin: null,
      reservas: [],
    };
  },

  methods: {
    async buscar() {
      var data = await obtenerReporteReservasFachada(
        this.fechaInicio,
        this.fechaFin
      );
      this.reservas = data;
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
