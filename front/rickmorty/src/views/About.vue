<template>
  <div class="about">
    <AboutCard :info="info"></AboutCard>
  </div>
</template>

<script>
// @ is an alias to /src
import AboutCard from "@/components/AboutCard.vue";

export default {
  name: "About",
  components: {
    AboutCard
  },
  data() {
    return {
      info: {
        name: "Giyi",
        social: "https:/twitter.com/giyilok",
        imagen: "../assets/giyi.jpg",
        api: "API de Rick y Morty",
        urlApi: "https://rickandmortyapi.com/",
        lib: "Axios"
      }
    };
  }
};
</script>

<style scoped>
.cardted {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>