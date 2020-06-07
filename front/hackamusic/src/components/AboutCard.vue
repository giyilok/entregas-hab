<template>
  <div>
    <h1>Hola!</h1>
    <img :src="info.imagen" alt="Mi foto" />
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
    info: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .card {
  width: 400px;
  border: 1px solid black;
  margin: 1rem;
  border-radius: 4%;
  overflow: hidden;
  display: inline-block;
}

img {
  height: 20vh;
  border-radius: 50%;
}

li {
  list-style: none;
} */

a {
  text-decoration: none;
  color: black;
}
</style>
