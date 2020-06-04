<template>
  <div class="home">
    <div class="cont">
      <figure>
        <img alt="Vue logo" src="../assets/RickandMortyblack.png" />
      </figure>

      <!-- Barra de búsqueda y botón para buscar por Id-->
      <div class="box">
        <label for="bySearch">Find your character:</label>
        <input v-model="search" id="search" type="search" placeholder="Search" name="bySearch" />
        <button @click="searchChar(search)">Find by ID</button>
      </div>

      <NavPage v-if="empty" :page="page" @next="next()" @previous="previous()"></NavPage>

      <!-- Imprime el personaje si se pulsa el botón de buscar pot Id-->
      <div v-show="print">
        <h2>Character 👇</h2>
        <CharCard :chars="charly"></CharCard>
      </div>

      <!-- O imprime la lista de personajes-->
      <CharCard v-show="!print" :chars="filteredChars"></CharCard>

      <NavPage v-if="empty" :page="page" @next="next()" @previous="previous()"></NavPage>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharCard from "@/components/CharCard.vue";
import NavPage from "@/components/NavPage.vue";
// Importando la configuración de la api
import api from "@/api/api.js";

export default {
  name: "Home",
  components: {
    CharCard,
    NavPage
  },
  data() {
    return {
      chars: [],
      search: "",
      charly: [],
      id: null,
      print: false,
      empty: false,
      info: {},
      page: 1
    };
  },
  methods: {
    async searchChar(id) {
      // Si el campo de búsqueda está vacío y se pulsa el botón de buscar
      try {
        if (id === "" || id <= 0 || id > 591 || isNaN(id)) {
          throw new Error("Debes introducir un Id correcto (1 - 591)");
        }

        // Borra el array
        if (this.charly.length) {
          this.charly.splice(0);
        }

        // Realizamos la petición del personaje
        const response = await api.getChar(id);
        this.charly.push(response.data);

        this.print = true;
      } catch (error) {
        alert(error.message);
      }
    },
    async next() {
      try {
        if (this.info.next) {
          const { data } = await api.getPage(this.info.next);

          this.chars = data.results;
          this.info = data.info;
          this.page++;
        } else {
          alert("No hay más resultados");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    async previous() {
      try {
        if (this.info.prev) {
          const { data } = await api.getPage(this.info.prev);

          this.chars = data.results;
          this.info = data.info;

          this.page--;
        } else {
          alert("Estás en la primera página");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  },
  computed: {
    filteredChars() {
      // Por defecto imprime el array de personajes
      this.print = false;
      this.empty = false;

      // Si search está vacío
      if (!this.search) {
        this.empty = true;
        return this.chars;
      }

      // Si search tiene algo...
      return this.chars.filter(
        char =>
          char.name.toLowerCase().includes(this.search.toLowerCase()) ||
          char.gender.toLowerCase().includes(this.search.toLowerCase()) ||
          char.status.toLowerCase().includes(this.search.toLowerCase()) ||
          char.species.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  async created() {
    const { data } = await api.getAll();
    this.info = data.info;
    this.chars = data.results;
    /* api.getAll().then(response => {
      this.chars = response.data.results;}); */
  }
};
</script>

<style scoped>
.cont {
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

figure img {
  width: 100%;
  max-width: 640px;
}

.box label {
  font-size: 1.4rem;
  color: #298194;
}

input {
  width: 200px;
  text-decoration-color: #2fa2bc;
}

::placeholder {
  color: #2fa2bc;
}

input,
button {
  margin: 1rem;
  background: white;
  padding: 8px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #2fa2bc;
  color: #2fa2bc;
}
</style>

