<template>
  <div class="about">
    <vue-headful title="About page" description="An about generic page" />
    <aboutCard :info="info" :libs="info.libs"></aboutCard>
  </div>
</template>

<script>
// @ is an alias to /src
import aboutCard from "@/components/AboutCard.vue";

export default {
  name: "About",
  components: {
    aboutCard,
  },
  data() {
    return {
      info: {
        name: "Giyi",
        social: "https:/twitter.com/giyilok",
        imagen: "../assets/giyi.jpg",
        api: "API de Last.fm",
        urlApi: "https://www.last.fm/music/",
        libs: [
          { lib: "Axios", urlLib: "https://github.com/axios/axios" },
          { lib: "SweetAlert", urlLib: "https://sweetalert2.github.io/" },
          {
            lib: "Vue-headful",
            urlLib: "https://github.com/troxler/vue-headful",
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
