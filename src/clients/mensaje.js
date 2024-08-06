import { ElMessageBox } from "element-plus";

export function mensaje(titulo, mensaje, tipo) {
    ElMessageBox.alert(mensaje, titulo, {
      confirmButtonText: "Ok",
      type: tipo,
      position: "center",
      customClass: "messageBox",
      callback: () => {
        // Acciones después de hacer clic en "Aceptar"
        console.log("Mensaje aceptado");
      },
    });
  }