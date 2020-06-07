<template>
  <div>
    <div id="nav">
      <router-link id="logo" :to="{ name: 'Home' }">Hack a Music</router-link>
      <div id="menu">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'TopTracks' }">TopTracks</router-link>
        <router-link :to="{ name: 'TopArtists' }">TopArtists</router-link>
        <router-link :to="{ name: 'About' }">About</router-link>
      </div>
    </div>
    <div class="linea"></div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
};
</script>

<style scoped>
.linea {
  border-top: 0.8px solid lightslategrey;
}

#menu {
  display: flex;
  height: 52px;
}

#nav {
  padding: 20 px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  z-index: 5;
  background: white;
}

#nav #logo {
  font-size: 24px;
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
}

#nav a {
  font-weight: bold;
  color: lightslategrey;
  margin: 1rem;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ff2f56;
}

#menu {
  display: flex;
  height: 52px;
}

#menu a {
  padding: 0 8px;
}
</style>
