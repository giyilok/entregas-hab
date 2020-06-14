<template>
  <div>
    <div id="nav">
      <router-link :to="{name: 'Clientes'}" v-show="visible">Clientes</router-link>
      <router-link :to="{name: 'AddClients'}" v-show="visible">Añadir cliente</router-link>
      <router-link :to="{name: 'Productos'}">Productos</router-link>
      <router-link :to="{name: 'About'}">About</router-link>
      <p>Hola, {{ email }}</p>
      <button @click="logoutUser">Logout</button>
    </div>
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
p {
  display: inline-block;
  font-size: 12px;
}
</style>
