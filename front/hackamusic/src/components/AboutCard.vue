<template>
  <div class="info">
    <h1>Hola!</h1>

    <img src="../assets/giyiemoji.jpeg" alt="Mi foto" />

    <p>
      Soy
      <a :href="info.social">{{ info.name }},</a>
      y este proyecto proyecto ha sido realizado con Vue
      <br />utilizando la
      <a :href="info.urlApi">{{ info.api }}</a>
      y las librerías:
    </p>

    <ul>
      <li v-for="lib in info.libs" :key="lib.id">
        <a :href="lib.urlLib">{{ lib.lib }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AboutCard",
  props: {
    info: Object
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
  text-align: center;
}

.info {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  display: block;
  height: 20vh;
  border-radius: 50%;
  margin: 2rem auto;
}

li {
  list-style: none;
  margin: 0.3rem 0;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #ff2f56;
}
</style>
