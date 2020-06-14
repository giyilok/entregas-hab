<template>
  <div class="about">
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="About" description="Listado de clientes" />
    </div>
    <!--  Título de la pestaña -->

    <!--  Menú de navegación  -->
    <menucustom></menucustom>
    <!--  Menú de navegación  -->

    <!--  Componente con la info  -->
    <aboutCard :info="info" :libs="info.libs"></aboutCard>
    <!--  Componente con la info  -->

    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
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

<style scoped></style>
