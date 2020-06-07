<template>
  <div>
    <!-- Configuración título de vista -->
    <vue-headful
      title="Top Artists List"
      description="List of most popular artists"
    />
    <!-- Configuración título de vista -->

    <!-- Menú custom -->
    <div class="menu-container">
      <menucustom></menucustom>
    </div>
    <!-- Menú custom-->

    <!-- Barra de búsqueda-->
    <div class="topartists">
      <form>
        <div class="box">
          <label for="bySearch">Find your artist:</label>
          <input
            v-model="search"
            id="search"
            type="search"
            placeholder="Enter the artist`s name"
            name="bySearch"
          />
          <button>Search</button>
        </div>
      </form>
      <!-- Barra de búsqueda-->

      <!-- Contenido de la vista-->
      <h1>Last week most popular artists</h1>
      <h2>TOP 10</h2>

      <!-- Contenido de la vista-->

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

      <!-- Lista de artistas-->
      <div>
        <artistsList
          class="artists-list"
          v-show="!visible"
          :artists="filteredArtists"
        ></artistsList>
      </div>
      <footercustom v-show="!visible"></footercustom>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import artistsList from "@/components/ArtistsList.vue";
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "TopArtists",
  data() {
    return {
      artists: [],
      search: "",
      visible: true,
    };
  },
  components: {
    artistsList,
    menucustom,
    footercustom,
  },
  async created() {
    const response = await api.getArtists();
    this.artists = response.data.topartists.artist;
    console.log(this.artists);
  },
  computed: {
    filteredArtists() {
      setTimeout(() => {
        this.visible = false;
      }, 2000);
      // Si search está vacío
      if (!this.search) {
        return this.artists;
      }

      // Si search tiene algo...
      return this.artists.filter((artist) =>
        artist.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.topartists {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 70%;
}

h1 {
  font-size: 42px;
}

h2 {
  /* color: #ff2f56; */
  font-size: 36px;
}

.artists-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-grow: 1;
  margin: 1rem;
}

form {
  margin: 120px auto 40px;
  display: flex;
  justify-content: center;
}

label {
  font-size: 24px;
  margin-right: 1rem;
}

input {
  width: 250px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid lightslategrey;
  font-size: 1rem;
}

button {
  display: inline-block;
  background: #ff2f56;
  border: #ff2f56;
  border-radius: 18px;
  color: white;
  padding: 9px 16px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 12px;
  outline: none;
}
</style>
