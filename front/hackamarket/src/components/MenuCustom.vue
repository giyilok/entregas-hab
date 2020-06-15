<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{name: 'Clientes'}" v-show="visible">Clientes</router-link>
      <router-link :to="{name: 'AddClients'}" v-show="visible">Añadir cliente</router-link>
      <router-link :to="{name: 'Productos'}">Productos</router-link>
      <router-link :to="{name: 'About'}">About</router-link>
    </div>

    <div class="info">
      <span>Hola, {{ name }}</span>
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
      const email = localStorage.getItem("email");
      this.name = email
        .split("@")
        .slice(0, 1)
        .shift();
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
  margin-bottom: 70px;
}

.menu {
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  border: 1px solid #2c3e50;
}

.info {
  display: inline-block;
}

span {
  display: inline-block;
}

p {
  display: inline-block;
  font-size: 18px;
}

#nav {
  padding: 15px;
  display: inline-block;
  flex-grow: 1;
}

#nav a {
  margin: 0 5px;
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  width: 70px;
  padding: 4px 0;
  border: none;
  font-size: 14px;
  color: #42b983;
  background: white;
  border: 1px solid;
  border-radius: 18px;
  font-weight: 300;
  margin: 0 10px;
}
</style>
