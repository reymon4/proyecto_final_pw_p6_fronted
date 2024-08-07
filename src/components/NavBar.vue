<template>
  <div v-if="tipo === 'E'" class="menu">
    <router-link to="/empleados/vehiculos">Vehículos</router-link>
    <router-link to="/empleados/vehiculos/nuevo">Nuevo Vehículo </router-link>
    <router-link to="/empleados/clientes">Clientes</router-link>
    <router-link to="/empleados/clientes/nuevo">Nuevo Cliente</router-link>
    <router-link to="/empleados/reservas/retirar"
      >Retirar vehículo
    </router-link>
    <router-link to="/empleados/reservas/reporte">Reporte Reservas</router-link>
    <router-link to="/salir">Salir</router-link>
  </div>
  <div v-else class="menu">
    <router-link v-if="tipo !== 'V'" to="/clientes/vehiculos"
      >Vehiculos Disponibles</router-link
    >
    <router-link v-if="tipo !== 'V'" to="/cliente/datos"
      >Editar datos</router-link
    >
    <router-link v-if="tipo === 'V'" to="/clientes/registrarse"
      >Registrarse</router-link
    >
    <router-link v-if="tipo === 'V'" to="/iniciar">Iniciar sesión</router-link>
    <router-link v-if="tipo !== 'V'" to="/salir">Salir</router-link>
  </div>
</template>

<script>

import router from "@/router/router";
export default {
  props: {
    tipo: {
      default: "V",
      required: true,
      type: String,
    },
  },
  components: {
    router,
  },
};
</script>

<style scoped>
menu {
  display: flex;
  justify-content: flex-end;
  align-items: right;
  text-align: right;
}
.menu a {
  text-decoration: none;
  color: #333;
  color: #f8f9fa;
  margin: 1%;

  font-size: 3vmin;
  padding: 1vh 1vw;
  border-radius: 10px;
}

.menu a:hover {
  font-weight: bold;
  color:white;
}
.router-link-exact-active {
 font-weight: bold;
}
</style>