import { ElMessageBox } from "element-plus";
import {eliminarFachada} from "@/clients/clienteUsuario.js";


async function menjase(titulo, mensaje, tipo, cedula) {
    try {
        await ElMessageBox.confirm(mensaje, titulo, {
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            type: tipo,
            position: "center",
            customClass: "messageBox",
        });
        // Acciones después de hacer clic en "Sí"
        console.log("Mensaje aceptado");
        await eliminarFachada(cedula); 
    } catch {
        // Acciones después de hacer clic en "No"
        console.log("Mensaje rechazado");
    }
}

export function mensajeFacade(titulo, mensaje, tipo, cedula) {

   return menjase(titulo, mensaje, tipo, cedula); 
}
