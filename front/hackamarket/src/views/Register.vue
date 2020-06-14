<template>
  <div>
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Register" description="Registro de usuario" />
    </div>
    <!--  Título de la pestaña -->

    <!-- Formulario para añadir clientes-->
    <form>
      <h2>Registro de usuario</h2>
      <p v-show="required">No has rellenados todos lo campos</p>

      <!-- Input para nombre -->
      <label for="email">Email:</label>
      <input type="email" name="email" placeholder="Introduce tu email" v-model="email" />
      <br />

      <!-- Input para apellido -->
      <label for="password">Password:</label>
      <input type="password" name="password" placeholder="Introduce tu password" v-model="password" />
      <br />

      <!-- Input para ciudad -->
      <label for="repeatPassword">Password:</label>
      <input
        type="password"
        name="repeatPassword"
        placeholder="Repite tu password"
        v-model="repeatPassword"
      />
      <br />
      <p v-show="match">Las contraseñas no coinciden</p>
      <br />

      <!-- Botón para crear usurio -->
      <button @click.prevent="addClient">Crear Usuario</button>
    </form>

    <!-- Formulario -->

    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
  </div>
</template>

<script>
import footercustom from "@/components/FooterCustom.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddClient",
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      correctData: false,
      required: false,
      match: false
    };
  },
  components: {
    footercustom
  },
  methods: {
    // Función para comprobar si se dejó algún campo vacío
    validatingData() {
      if (
        // Si hay algún campo vacío se muestra mensaje de error
        this.email === "" ||
        this.password === "" ||
        this.repeatPassword === ""
      ) {
        this.correctData = false; // No enviar datos
        this.required = true; // Se muestra mensaje de campo vacío
        this.match = false; // No se muestra mensaje de passwords no match
      } else if (
        // Comprobar si password y repeatPassword son iguales
        this.password != this.repeatPassword
      ) {
        this.correctData = false; // No enviar datos
        this.required = false; // No se muestra mensaje de campo vacío
        this.match = true; // Se muestra mensaje de no coincidencia de passwords
      } else {
        this.correctData = true; // Enviar datos
        this.required = false; // No se muestra mensaje de campo vacío
        this.match = false; // No se muestra mensaje de no match
      }
    },
    addClient(nombre, apellido, ciudad, empresa) {
      // Validando datos del formulario
      this.validatingData();

      if (this.correctData) {
        var self = this;
        axios
          .post("http://localhost:3050/usuarios/add", {
            email: self.email,
            password: self.password,
            ciudad: self.ciudad,
            admin: 0
          })
          .then(function(response) {
            // Vaciamos los campos para la siguiente inserción
            self.emptyFields();

            if (response.data.status === "error") {
              Swal.fire({
                title: "Error",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "Ok"
              });
            } else {
              Swal.fire({
                title: "¡Usuario registrado!",
                text: "Te has registrado magistralmente",
                icon: "success",
                confirmButtonText: "Ok"
              });
            }
          })
          .catch(function(error) {
            // Si el error es que ya existe un usuario con ese email
            if (error.response.status === 409) {
              // Vaciamos los campos para corrección
              self.emptyFields();

              // Mostramos modal con el error
              Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "Ok"
              });
            } else {
              // Si es cualquier otro error lo muestra por consola
              console.log(error);
            }
          });
      }
    },
    emptyFields() {
      this.email = "";
      this.password = "";
      this.repeatPaswword = "";
    }
  }
};
</script>

<style scoped>
p {
  color: red;
}

form {
  margin-top: 3rem;
}

input {
  margin: 8px auto;
}
</style>
