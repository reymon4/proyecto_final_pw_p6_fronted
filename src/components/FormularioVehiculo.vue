<template>
  <div class="container">
    <hr />
    <label for="">Placa</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="placa" />
    <input
      v-else
      type="text"
      v-model="placa"
      :disabled="this.funcion == 'visualizar'"
    />

    <label for="">Modelo</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="modelo" />
    <input
      v-else
      type="text"
      v-model="modelo"
      :disabled="this.funcion == 'visualizar'"
    />

    <label for="">Marca</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="marca" />
    <input
      v-else
      type="text"
      v-model="marca"
      :disabled="this.funcion == 'visualizar'"
    />

    <label for="">Año</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="anio" />
    <input
      v-else
      type="text"
      v-model="anio"
      :disabled="this.funcion == 'visualizar'"
    />

    <label for="">País</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="pais" />
    <input
      v-else
      type="text"
      v-model="pais"
      :disabled="this.funcion == 'visualizar'"
    />

    <label for="">Cilindraje</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="cilindraje" />
    <input
      v-else
      type="text"
      v-model="cilindraje"
      :disabled="this.funcion == 'visualizar'"
    />
    <label for="">Avalúo</label>
    <input v-if="funcion === 'insertar'" type="number" v-model="avaluo" />
    <input
      v-else
      type="number"
      v-model="avaluo"
      :disabled="this.funcion == 'visualizar'"
    />
    <label for="">Valor diario</label>
    <input v-if="funcion === 'insertar'" type="number" v-model="valorDia" />
    <input
      v-else
      type="number"
      v-model="valorDia"
      :disabled="this.funcion == 'visualizar'"
    />
    <label for="">Estado</label>
    <input v-if="funcion === 'insertar'" type="text" v-model="estado" />
    <input
      v-else
      type="text"
      v-model="estado"
      :disabled="this.funcion == 'visualizar'"
    />
    <hr />
    <div v-if="funcion === 'insertar'" class="guardado">
      <button @click="guardar">Guardar</button>
    </div>
    <div v-if="funcion === 'visualizar'" class="otros">
      <button @click="volver()">Volver</button>
      <button @click="actualizar()">Actualizar</button>
    </div>
    <div v-if="funcion === 'actualizar'" class="otros">
      <button @click="volver()">Volver</button>
      <button @click="guardarCambios()">Guardar Cambios</button>
    </div>
  </div>
</template>

<script scoped>
import { mensaje } from "@/clients/mensaje";
import {
  insertarVehiculoFachada,
  buscarPorPlacaFachada,
  actualizarVehiculoFachada,
} from "@/clients/clienteVehiculo.js";
export default {
  props: {
    //Clave primaria es de placa
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
      id: null,
      placa: null,
      modelo: null,
      marca: null,
      anio: null,
      pais: null,
      cilindraje: null,
      avaluo: null,
      valorDia: null,
      estado: null,
    };
  },
  methods: {
    async handleData() {
      if (this.funcion === "visualizar" || this.funcion === "actualizar") {
        var data = await buscarPorPlacaFachada(this.clave);
        this.placa = this.clave;
        this.modelo = data.modelo;
        this.marca = data.marca;
        this.anio = data.anio;
        this.pais = data.pais;
        this.cilindraje = data.cilindraje;
        this.avaluo = parseFloat(data.avaluo);
        this.valorDia = data.valorDia;
        this.estado = data.estado;
      }
    },
    async guardar() {
      /* VERIFICAR LOS ATRIBUTOS EN EL BACK END */
      const clienteBody = {
        placa: this.placa,
        modelo: this.modelo,
        marca: this.marca,
        anio: this.anio,
        pais: this.pais,
        cilindraje: this.cilindraje,
        avaluo: this.avaluo,
        valorDia: this.valorDia,
        estado: this.estado,
      };
      var verificar = (await buscarPorPlacaFachada(this.placa)) !== "";
      console.log(verificar);
      if (verificar) {
        mensaje("Guardando", "revisa la placa y vuelve intentar", "error");
        this.refrescar();
      } else {
        // INSERTA
        await insertarVehiculoFachada(clienteBody);
        mensaje("Guardando....", "Se ha guardado Correctamente", "success");
        this.refrescar();
      }
    },
    async guardarCambios() {
      const clienteBody = {
        placa: this.placa,
        modelo: this.modelo,
        marca: this.marca,
        anio: this.anio,
        pais: this.pais,
        cilindraje: this.cilindraje,
        avaluo: this.avaluo,
        valorDia: this.valorDia,
        estado: this.estado,
      };
      var data = await actualizarVehiculoFachada(
        clienteBody.placa,
        clienteBody
      );
      mensaje("Actualizando....", "Se ha Actualizado Correctamente", "success");
      await this.visualizar(this.placa);
    },

    volver() {
      this.$router.push({ path: "/empleados/vehiculos" });
    },
    actualizar() {
      // Lógica para actualizar el vehículo, por ejemplo: redirigir a una página de actualización con la información del vehículo
      this.$router.push({
        path: "/empleados/vehiculos/actualizar",
        query: { placa: this.placa },
      });
    },
    refrescar() {
      this.placa = null;
      this.modelo = null;
      this.marca = null;
      this.anio = null;
      this.pais = null;
      this.cilindraje = null;
      this.avaluo = null;
      this.valorDia = null;
      this.estado = null;
    },
    visualizar(placa) {
      // Lógica para visualizar el vehículo, por ejemplo: redirigir a una página de visualización con la información del vehículo
      this.$router.push({
        path: "/empleados/vehiculos/visualizar",
        query: { placa: placa },
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Dos columnas */
  grid-template-rows: repeat(12, 2fr); /* Dos filas */
}

label {
  font-style: italic;
  text-align: left;
}

button {
  width: 50%;
  height: 40px;
}
.otros {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  grid-template-rows: repeat(2, 100px); /* Dos filas */
  gap: 10px; /* Espacio entre las celdas */
}
.item_large {
  grid-column: span 2; /* El elemento ocupa dos columnas */
}
</style>
