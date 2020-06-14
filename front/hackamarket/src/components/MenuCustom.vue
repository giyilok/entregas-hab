<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{name: 'Clientes'}" v-show="visible">Clientes</router-link>
      <router-link :to="{name: 'AddClients'}" v-show="visible">Añadir cliente</router-link>
      <router-link :to="{name: 'Productos'}">Productos</router-link>
      <router-link :to="{name: 'About'}">About</router-link>
    </div>
    <p>Hola, {{ email }}</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { clearLogin, isLoggedIn, checkAdmin } from "../api/utils";

export default {
  name: "MenuCustom",
  data() {
    return {
      name: "",
      visible: false
    };
  },
  methods: {
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    },
    getUserEmail() {
      this.email = localStorage.getItem("email");
    }
  },
  created() {
    this.getUserEmail();
  },
  mounted() {
    if (checkAdmin()) {
      this.visible = true;
    }
  }
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}

p {
  display: inline-block;
  font-size: 18px;
}

#nav a {
  margin: 0 5px;
  text-decoration: none;
}

button {
  width: 80px;
  padding: 5px 0;
  border: none;
  font-size: 16px;
  color: #42b983;
  background: white;
  border: 1px solid;
  border-radius: 18px;
  font-weight: 300;
  margin: 0 10px;
}
</style>
