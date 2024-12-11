import Swal from "sweetalert2";

    export function mostraralerta(mensaje) {
        let mensaje1 = mensaje;

        if (mensaje === "Ortodoncia") {
            mensaje1 = "La ortodoncia es una especialidad de la odontología que se encarga de corregir las malposiciones de los dientes y huesos maxilares. Su objetivo es restaurar el equilibrio morfológico y funcional de la boca y la cara, mejorando también la estética facial.";
        }else if (mensaje === "Endodoncia") {
            mensaje1 = "La endodoncia es una especialidad de la odontología que se encarga de tratar las enfermedades de la pulpa dental y sus complicaciones. La pulpa dental es un tejido blando que se encuentra en el interior del diente y que contiene nervios, vasos sanguíneos y tejido conectivo.";
        }else if (mensaje === "Periodoncia") {
            mensaje1 = "La periodoncia es una especialidad de la odontología que se encarga de prevenir, diagnosticar y tratar las enfermedades y condiciones que afectan los tejidos que dan soporte a los órganos dentarios (encía, ligamento periodontal, cemento radicular y hueso alveolar) y a los substitutos implantados, para el mantenimiento de la salud, función y estética de los dientes y sus tejidos adyacentes.";
        }else if (mensaje==="Estetica Dental"){
            mensaje1="La estética dental es una especialidad de la odontología que se encarga de mejorar la apariencia de los dientes y la sonrisa. El objetivo de la estética dental es conseguir una sonrisa bonita y natural.";
        }else if(mensaje==="Implantes dentales"){
            mensaje1="Los implantes dentales son raíces artificiales que se colocan en el hueso maxilar o mandibular para sustituir los dientes que faltan. Los implantes dentales son la mejor opción para reemplazar los dientes perdidos, ya que ofrecen una solución permanente y estética.";
        }else if(mensaje==="Prótesis dental"){
            mensaje1="La prótesis dental es una especialidad de la odontología que se encarga de reemplazar los dientes perdidos y los tejidos adyacentes con prótesis dentales. El objetivo de la prótesis dental es restaurar la función y la estética de la boca.";
        }else if(mensaje1==="Odontopediatría"){
            mensaje1="La odontopediatría es una especialidad de la odontología que se encarga de tratar a los niños. El objetivo de la odontopediatría es prevenir, diagnosticar y tratar las enfermedades bucodentales de los niños.";
        }else if(mensaje1==="Odontología Integral"){
            mensaje1="La odontología integral es una especialidad de la odontología que se encarga de tratar las enfermedades bucodentales de forma integral. El objetivo de la odontología integral es conseguir la salud bucodental y la estética dental de los pacientes.";
        }else if(mensaje1==="Radiografías dentales"){
            mensaje1="Las radiografías dentales son imágenes de los dientes y los tejidos que los rodean. Las radiografías dentales son una herramienta fundamental para el diagnóstico y el tratamiento de las enfermedades bucodentales.";
        }else{
            mensaje1="No hay información disponible";
        }

        Swal.fire({
            title: mensaje1,
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            width:'800px'
        }).then();
    }
//export void