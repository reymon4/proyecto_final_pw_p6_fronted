<template>
  <div class="container">
    <div class="image">
      <img :src="imageUrl" alt="Imagen" />
    </div>
    <div class="formulario">
      <h2>Inicie Sesión En Su Cuenta Avis</h2>
      <input
        type="text"
        v-model="cedula"
        placeholder="Ingrese su número de cédula"
      />
      <input
        type="password"
        v-model="contrasenia"
        placeholder="Ingrese su contraseña"
      />
      <h6>
        Este sitio está protegido por reCAPTCHA Enterprise y se aplican la
        Política de privacidad y los Términos de servicio de Google.
      </h6>

      <button @click="inicio">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from "element-plus";
import { mensaje } from "@/clients/mensaje";

import {
  verificarUsuarioFachada,
  consultarFachada,
} from "@/clients/clienteUsuario";

export default {
  data() {
    return {
      cedula: null,
      contrasenia: null,
      imageUrl:
        "https://fleetnews.gr/wp-content/uploads/2021/04/Avis_Photo-scaled-1.jpg",

      usuario: {
        id: null,
        tipo: null,
      },
    };
  },

  methods: {
    async inicio() {
      /* VERIFICAR LOS ATRIBUTOS EN EL BACK END */
      const clienteBody = {
        cedula: this.cedula,
        password: this.contrasenia,
      };
      if (
        this.cedula === null ||
        this.contrasenia === null ||
        this.cedula === "" ||
        this.contrasenia === ""
      ) {
        mensaje("Error....", "No puedes dejar los campos vacios", "error");
      } else if (this.cedula === "admin" && this.contrasenia === "admin") {
        mensaje(
          "Iniciando Sesion...",
          "Iniciando Sesion como Administrador",
          "success"
        );
        this.$emit("cambio-tipo", "E");
        this.usuario.id = "admin";
        this.usuario.tipo = "E";
        await this.redireccionar();
      } else {
        try {
          var verificar = (await consultarFachada(this.cedula)) !== null;
          console.log(verificar);
          if (verificar) {
            var autenticar = await verificarUsuarioFachada(clienteBody);
            if (autenticar) {
              this.mensajeOK();
            } else {
              mensaje("Iniciando Sesion...", "Contraseña equivocada", "error");
            }
          } else {
            mensaje("Iniciando Sesion...", "El Usuario No existe", "error");
          }
        } catch {
          mensaje(
            "Iniciando Sesion...",
            "Revisa tus credenciales y vuelve a intenta",
            "error"
          );
        }
      }
    },
    redireccionar() {
      console.log(this.usuario);
      this.$router.push({ path: "/inicio", usuario: this.usuario });
    },

    mensajeOK() {
      ElMessageBox.alert(
        "Credenciales Correctas",
        "Tus Credenciales Fueron válidadas Correctamente",
        {
          confirmButtonText: "Aceptar",
          type: "success",
          position: "center",
          customClass: "messageBox",
          callback: () => {
            // Acciones después de hacer clic en "Aceptar"
            this.$emit("cambioTipo", "C");
            this.$emit("cambioCedula", this.cedula);
            this.usuario.id = this.cedula;
            this.usuario.tipo = "C";
            this.redireccionar();
            console.log("Mensaje aceptado");
          },
        }
      );
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}
.image {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.messageBox {
  background-color: #833e3e !important;
  color: rgb(221, 23, 23) 3 !important;
  border: 1px solid #1c0fcf;
  padding: 10px;
  width: 10% !important;
}
.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 450px;
  background-color: #e6e6e6cf;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 65px auto;
  box-shadow: 0px 0px 10px 5px #4d4a4a83;
}
h2 {
  align-items: center;
  font-style: bold;
}

button {
  width: 50%;
  height: 40px;
  cursor: pointer;
  border: none;
  margin-top: 65px;
  background-color: #dd2136;
  color: white;
}
input {
  padding: 10px;
  margin: 20px;
  border: none;
  border-radius: 10px;
}
</style>
