import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/inicio",
    component: () => import("@/pages/PaginaInicio.vue"),
  },
  {
    path: "/clientes/registrarse",
    component: () => import("@/pages/ClienteRegistrar.vue"),
  },
  {
    path: "/iniciar",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/salir",
    component: () => import("@/pages/LogOut.vue"),
  },
  {
    path: "/clientes/vehiculos",
    component: () => import("@/pages/ClienteListaVehiculos.vue"),
  },
  {
    path: "/cliente/datos",
    component: () => import("@/pages/ClienteActualizar.vue")
  },
  {
    path: "/empleados/vehiculos",
    component: () => import("@/pages/EmpleadoBuscarVehiculo.vue"),
  },
  {
    path: "/empleados/clientes",
    component: () => import("@/pages/EmpleadoBuscarCliente.vue"),
  },
  {
    path: "/empleados/vehiculos/actualizar",
    component: () => import("@/pages/EmpleadoActualizarVehiculo.vue"),
  },
  {
    path: "/empleados/vehiculos/visualizar",
    component: () => import("@/pages/Vehiculo.vue"),
  },
  {
    path: "/empleados/clientes/actualizar",
    component: () => import("@/pages/EmpleadoActualizarCliente.vue"),
  },
  {
    path: "/empleados/clientes/visualizar",
    component: () => import("@/pages/Cliente.vue"),
  },
  {
    path: "/empleados/clientes/nuevo",
    component: () => import("@/pages/EmpleadoIngresarCliente.vue"),
  },
  {
    path: "/empleados/vehiculos/nuevo",
    component: () => import("@/pages/EmpleadoIngresarVehiculo.vue"),
  },
 
  {
    path: "/empleados/reservas/retirar",
    component: () => import("@/pages/EmpleadoRetirarVehiculo.vue")
  },
  {
    path: "/clientes/reservar",
    component: () => import("@/pages/ClienteReservar.vue"),
  }, 

  {
    path: "/empleados/reservas/reporte",
    component: () => import("@/pages/EmpleadoReporteReserva.vue"),
  }, 
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/PaginaInicio.vue"),
  },
  

];

const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
