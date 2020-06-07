<template>
  <div>
    <!-- Configuración título de vista -->
    <vue-headful title="Top Tracks List" description="List of most popular tracks" />
    <!-- Configuración título de vista -->

    <!-- Menú custom -->
    <div class="menu-container">
      <menucustom></menucustom>
    </div>
    <!-- Menú custom-->

    <!-- Contenido de la vista -->
    <div class="top-tracks">
      <div class="menu-blank"></div>

      <h1>Latest hits</h1>
      <h2>Top 15</h2>

      <!-- CSS Loader  -->
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
      <!-- CSS Loader  -->

      <!--  Componente lista de tracks -->
      <trackList class="track-list" v-show="!visible" :tracks="tracks"></trackList>
      <!--  Componente lista de tracks -->

      <!-- Footer custom -->
      <footercustom v-show="!visible"></footercustom>
      <!-- Footer custom -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import trackList from "@/components/TracksList.vue";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "TopTracks",
  data() {
    return {
      tracks: [],
      visible: true
    };
  },
  components: {
    trackList,
    menucustom,
    footercustom
  },
  async created() {
    const response = await api.getTopTracks();

    setTimeout(() => {
      this.visible = false;
    }, 1000);

    this.tracks = response.data.tracks.track;
    console.log(response);
  }
};
</script>

<style scoped>
.menu-blank {
  height: 65px;
  width: 100%;
}

h1,
h2 {
  font-weight: 42px;
}

h1 {
  margin-top: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.top-tracks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.track-list {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
