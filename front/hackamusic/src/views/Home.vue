<template>
  <div>
    <!-- Configuración título de vista -->
    <vue-headful
      title="Top tags List"
      description="List of most popular tags"
    />
    <!-- Configuración título de vista -->

    <!-- Menú custom -->
    <div class="menu-container">
      <menucustom></menucustom>
    </div>
    <!-- Menú custom-->

    <!-- Contenido de la vista -->
    <div class="home">
      <img src="@/assets/amusic.png" alt="Imagen music" />
      <h1>Find your music in a unique place</h1>
      <button @click="seeMsg">Start here</button>

      <!-- CSS Loader-->
      <div v-show="visible" class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!-- CSS Loader-->

      <!--  Componente lista de tags -->
      <tagList class="tags" v-show="!visible" :tags="tags"></tagList>
      <!--  Componente lista de tags -->
      <!--     Footer Custom  -->
      <footercustom v-show="!visible"></footercustom>
      <!--     Footer Custom  -->
    </div>
    <!-- Contenido de la vista -->
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import tagList from "@/components/TagsList.vue";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Home",
  data() {
    return {
      tags: [],
      visible: true,
    };
  },
  components: {
    tagList,
    menucustom,
    footercustom,
  },
  methods: {
    seeMsg() {
      Swal.fire({
        title: "Explora tu música",
        text: "Este es el TOP10 de los tags en estos momentos",
        icon: "info",
        confirmButtonText: "Comienza",
      });
    },
  },

  async created() {
    const response = await api.getTopTags();

    setTimeout(() => {
      this.visible = false;
    }, 1000);

    this.tags = response.data.tags.tag;
    console.log(response);
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 70%;
}

.home-gr {
  flex-grow: 1;
}

h1 {
  font-size: 42px;
}

.tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
}

img {
  width: 100px;
  margin: 80px auto 0;
  position: relative;
}

button {
  display: block;
  background: #ff2f56;
  border: #ff2f56;
  border-radius: 16px;
  color: white;
  padding: 8px 16px;
  width: 140px;
  font-size: 17px;
  font-weight: 600;
  margin: 8px auto 24px;
  outline: none;
}
</style>
