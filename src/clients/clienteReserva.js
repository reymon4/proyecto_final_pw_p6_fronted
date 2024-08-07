import axios from "axios";

const consultarDisponibilidad = async (body) => {
  const data = axios
    .post(
      `http://localhost:8081/API/v1.0/AVIS/reservas/fecha_disponibilidad`,
      body
    )
    .then((r) => r.data);
  console.log(data);
  return data;
};

const reservar = async (body) => {
  const data = axios
    .post(`http://localhost:8081/API/v1.0/AVIS/reservas`, body)
    .then((r) => r.data);
  console.log(data);
  return data;
};
const cobro = async (body) => {
  const data = axios
    .post(`http://localhost:8081/API/v1.0/AVIS/reservas/cobro`, body)
    .then((r) => r.data);
  console.log(data);
  return data;
};
const obtenerCobro = async (body) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/reservas/cobro/${body}`)
    .then((r) => r.data);
  console.log(data);
  return data;
};

const retirarVehiculoReservado = async (numero) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/reservas/retirar`, {
      params: { numero },
    })
    .then((r) => r.data);
  console.log(data);
  return data;
};

const obtenerReserva = async (numero) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/reservas`, { params: { numero } })
    .then((r) => r.data);
  console.log(data);
  return data;
};

const obtenerReporteReservas = async (fechaInicio, fechaFin) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/reservas/reportes`, {
      params: { fechaInicio, fechaFin },
    })
    .then((r) => r.data);
  console.log(data);
  return data;
};

const obtenerReservasPrevias = async (fechaInicio, fechaFin) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/reservas/comprobar`, {
      params: { fechaInicio, fechaFin },
    })
    .then((r) => r.data);
  console.log("clienteReserva.js > obtenerReservasPrevias > data: ");

  console.log(data);
  return data;
};

export const consultarDisponibilidadFachada = async (body) => {
  return await consultarDisponibilidad(body);
};
export const reservarFachada = async (body) => {
  return await reservar(body);
};
export const cobroFachada = async (body) => {
  return await cobro(body);
};

export const retirarVehiculoReservadoFachada = async (numero) => {
  return await retirarVehiculoReservado(numero);
};

export const obtenerReservaFachada = async (numero) => {
  return await obtenerReserva(numero);
};

export const obtenerReporteReservasFachada = async (fechaInicio, fechaFin) => {
  return await obtenerReporteReservas(fechaInicio, fechaFin);
};
export const obtenerCobroFachada = async (body) => {
  return await obtenerCobro(body);
};

export const obtenerReservasPreviasFachada = async (fechaInicio, fechaFin) => {
  return await obtenerReservasPrevias(fechaInicio, fechaFin);
};
