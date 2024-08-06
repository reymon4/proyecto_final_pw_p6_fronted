import axios from "axios";

//Funciones

const insertarVehiculo = async (body) => {
  const data = axios
    .post(`http://localhost:8081/API/v1.0/AVIS/vehiculos`, body)
    .then((r) => r.data);
  console.log(data);
};
const obtenerMarcas = async () => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/vehiculos/marcas`)
    .then((r) => r.data);
  console.log(data);

  return data;
};

const buscarPorMarca = async (marca) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/vehiculos/${marca}`)
    .then((r) => r.data);
  console.log(data);

  return data;
};

const actualizarVehiculo = async (placa, body) => {
  const data = axios
    .put(`http://localhost:8081/API/v1.0/AVIS/vehiculos/${placa}`, body)
    .then((r) => r.data);
  console.log(data);
};

const eliminarVehiculo = async (placa) => {
  const data = axios
    .delete(`http://localhost:8081/API/v1.0/AVIS/vehiculos/${placa}`)
    .then((r) => r.data);
  return data;
};

const buscarPorPlaca = async (placa) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/vehiculos/placa/${placa}`)
    .then((r) => r.data);
  console.log(data);
  return data;
};


const buscarPorMarcaYModelo = async (marca, modelo) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/vehiculos/filtro?marca=${marca}&modelo=${modelo}`)
    .then((r) => r.data);
  console.log(data);
  return data;
};

const buscarModelosPorMarca = async (marca) => {
  const data = axios
    .get(`http://localhost:8081/API/v1.0/AVIS/vehiculos/modelos/${marca}`)
    .then((r) => r.data);
  console.log(data);
  return data;
};

//Fachadas
export const obtenerMarcasFachada = async () => {
  return await obtenerMarcas();
};

export const buscarPorMarcaFachada = async (marca) => {
  return await buscarPorMarca(marca);
};

export const actualizarVehiculoFachada = async (placa, body) => {
  return await actualizarVehiculo(placa, body);
};

export const eliminarVehiculoFachada = async (placa) => {
  return await eliminarVehiculo(placa);
};
export const buscarPorPlacaFachada = async (placa) => {
  return await buscarPorPlaca(placa);
};

export const insertarVehiculoFachada = async (body) => {
  return await insertarVehiculo(body);
};

export const buscarPorMarcaYModeloFachada = async (marca,modelo) => {
  return await buscarPorMarcaYModelo(marca,modelo);
};

export const buscarModelosPorMarcaFachada = async (marca) => {
  return await buscarModelosPorMarca(marca);
};
