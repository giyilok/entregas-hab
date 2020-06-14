<template>
  <div>
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Login" description="Formulario para hacer login" />
    </div>
    <!--  Título de la pestaña -->

    <h2>Haz login 👇</h2>
    <input type="email" placeholder="Escribe tu email" v-focus required v-model="email" />
    <br />
    <input type="password" placeholder="Escribe tu contraseña" required v-model="password" />
    <br />

    <button @click="login">Login</button>

    <p v-show="required">Debes rellenar los dos campos</p>
    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
    <br />
    <router-link :to="{name: 'Register'}">O puedes registrarte aquí</router-link>
  </div>
</template>

<script>
import { loginUser } from "../api/utils";
import footercustom from "../components/FooterCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      correctData: false,
      required: false
    };
  },
  components: {
    footercustom
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    // Función para comprobar por código si se dejó algún campo vacío
    validatingData() {
      if (this.email === "" || this.password === "") {
        this.correctData = false; // No enviar
        this.required = true; // Se muestra mensaje
      } else {
        this.correctData = true; // Sí enviar
        this.required = false; // No se muestra el mensaje
      }
    },
    async login() {
      // Comprobamos que se hayan introducido los campos
      this.validatingData();

      // Si los datos son correctos, los enviamos
      if (this.correctData) {
        try {
          // Intento hacer login
          await loginUser(this.email, this.password);

          // Si hay login que me lleve a la vista productos
          this.$router.push("/productos");
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: err.response.data,
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      } else {
      }
    }
  }
};
</script>

<style scoped>
p {
  color: red;
}

button {
  display: inline-block;
}
</style>
