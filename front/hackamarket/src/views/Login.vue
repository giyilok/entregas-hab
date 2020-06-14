<template>
  <div class="login">
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Login" description="Formulario para hacer login" />
    </div>
    <!--  Título de la pestaña -->
    <div class="container">
      <h2>HackaMarket Para comprar inicia sesión</h2>
      <form>
        <label for="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email"
          v-focus
          required
          v-model="email"
        />
        <br />
        <label for="passord">Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
          required
          v-model="password"
        />
        <br />

        <button @click="login">Login</button>

        <p v-show="required">Debes rellenar los dos campos</p>
        <router-link :to="{name: 'Register'}">O puedes registrarte aquí</router-link>
      </form>
    </div>
    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
    <br />
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
      required: false,
      image: "../assets/mountain.jpg"
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
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

.foootercustom {
  color: white;
}

.login {
  position: relative;
  height: 100vh;
  background-image: url("~@/assets/mountain.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
}

.container {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  padding: 20px 25px;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  border-radius: 18px;
}

.container h2 {
  text-align: left;
  color: #fafafa;
  margin-bottom: 20px;
  border-bottom: 4px solid #df7438;
}

.container form input {
  width: calc(100% - 20px);
  padding: 3px 10px;
  margin-bottom: 10px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #df7438;
  color: #fff;
  font-size: 20px;
  outline: none;
}

.container form label {
  display: block;
  text-align: left;
  color: #f0a87e;
}
.container form input::placeholder {
  color: #e2e2e2;
  font-size: 18px;
}

.container form button {
  width: 100%;
  padding: 5px 0;
  border: none;
  background-color: #df7438;
  font-size: 18px;
  color: #fafafa;
  border-radius: 18px;
}

.login .footercustom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  color: white;
}

a {
  display: inline-block;
  text-decoration: none;
  margin-top: 6px;
}

a:link {
  color: white;
}

a:visited {
  color: white;
}

p {
  color: #df7438;
}
</style>
