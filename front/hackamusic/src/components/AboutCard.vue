<template>
  <div class="info">
    <h1>Hola!</h1>
    <img src="../assets/giyi.jpg" alt="Mi foto" />
    <p>
      Soy
      <a :href="info.social">{{ info.name }},</a>
      y este proyecto proyecto ha sido realizado en Vue
    </p>
    <p>
      utilizando la
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}
.info {
  text-align: center;
}

img {
  display: block;
  height: 20vh;
  border-radius: 50%;
  margin: 1rem auto;
}

li {
  list-style: none;
}

.info p {
  margin: 0 auto;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #ff2f56;
}
</style>
