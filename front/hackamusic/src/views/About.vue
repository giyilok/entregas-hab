<template>
  <div class="about">
    <!-- Configuración título de vista -->
    <vue-headful title="About page" description="An about generic page" />
    <!-- Configuración título de vista -->

    <!-- Menú custom -->
    <div class="menu-container">
      <menucustom></menucustom>
    </div>
    <!-- Menú custom-->

    <div class="menu-blank"></div>

    <aboutCard :info="info" :libs="info.libs"></aboutCard>
  </div>
</template>

<script>
// @ is an alias to /src
import aboutCard from "@/components/AboutCard.vue";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "About",
  components: {
    aboutCard,
    menucustom,
    footercustom
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
            urlLib: "https://github.com/troxler/vue-headful"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.menu-blank {
  height: 65px;
  width: 100%;
}
</style>
