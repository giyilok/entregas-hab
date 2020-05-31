<template>
  <div>
    <h1>Hola!</h1>
    <img src="../assets/giyi.jpg" alt="Mi foto" />
    <p>
      Soy
      <a :href="info.social">{{ info.name }},</a>
      y he realizado este primer proyecto en
      Vue
    </p>
    <p>
      utilizando la
      <a :href="info.urlApi">{{ info.api }}</a>
      y la librería {{ info.lib}}
    </p>
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
.card {
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
</style>
