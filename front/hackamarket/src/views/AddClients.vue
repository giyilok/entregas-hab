<template>
  <div>
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Add Clients" description="Formulario para añadir clientes" />
    </div>
    <!--  Título de la pestaña -->

    <!--  Menú de navegación  -->
    <menucustom></menucustom>
    <!--  Menú de navegación  -->

    <div class="blank"></div>

    <!-- Formulario para añadir clientes-->
    <addclientform v-on:addclient="addClient"></addclientform>

    <!-- Formulario -->

    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import addclientform from "@/components/AddClientForm.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddClient",
  data() {
    return {
      correctData: false,
      required: false
    };
  },
  components: {
    menucustom,
    footercustom,
    addclientform
  },
  methods: {
    // Función para comprobar si se dejó algún campo vacío
    validatingData(nombre, apellido, ciudad, empresa) {
      if (nombre === "" || apellido === "" || ciudad === "" || empresa === "") {
        this.correctData = false; // No enviar
        this.required = true; // Se muestra mensaje
      } else {
        this.correctData = true; // Sí enviar
        this.required = false; // No se muestra el mensaje
      }
    },
    addClient(newNombre, newApellido, newCiudad, newEmpresa) {
      console.log(newNombre, newApellido, newCiudad, newEmpresa);
      // Validando datos del formulario
      this.validatingData(newNombre, newApellido, newCiudad, newEmpresa);

      // Si los datos son correctos
      if (this.correctData) {
        var self = this;
        axios
          .post("http://localhost:3050/clientes/add", {
            nombre: newNombre,
            apellido: newApellido,
            ciudad: newCiudad,
            empresa: newEmpresa
          })
          .then(function(response) {
            Swal.fire({
              title: "¡Cliente añadido!",
              text: "El ciente se ha añadido con éxito",
              icon: "success",
              confirmButtonText: "Ok"
            });
            console.log(response);
          })
          .catch(function(error) {
            console.log(error.response);
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonText: "Ok"
            });
          });
      } else {
        // Si los datos no son correctos, lanzamos aviso
        Swal.fire({
          title: "Error!",
          text: "No has rellenado todos los campos del formulario.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    }
  }
};
</script>

<style scoped>
.blank {
  width: 100%;
  height: 80px;
}

.footercustom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
