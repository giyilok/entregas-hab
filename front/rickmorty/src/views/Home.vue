<template>
  <div class="home">
    <div class="cont">
      <figure>
        <img alt="Vue logo" src="../assets/Rick and Morty black.png" />
      </figure>

      <!-- Barra de búsqueda-->
      <div class="box">
        <label for="bySearch">Find your character: </label>
        <input
          v-model="search"
          id="search"
          type="search"
          placeholder="Search"
          name="bySearch"
        />
      </div>

      <!-- Barra de búsqueda por id -->
      <div id="box">
        <label for="byId">Find your character by ID: </label>
        <input v-model="id" name="byId" placeholder="Enter character´s ID" />
        <button @click="searchChar(id)">Find by ID</button>
      </div>

      <h2 v-show="print">Character 👇</h2>

      <p v-for="item in char" :key="item.id" v-show="print">{{ item }}</p>

      <!-- Component Charcards -->
      <CharCard v-show="!print" :chars="filteredChars"></CharCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharCard from "@/components/CharCard.vue";
// Importando la configuración de la api
import api from "@/api/api.js";

export default {
  name: "Home",
  components: {
    CharCard,
  },
  data() {
    return {
      chars: [],
      search: "",
      char: {},
      id: null,
      print: null,
    };
  },
  methods: {
    searchChar(id) {
      api.getChar(id).then((response) => (this.char = response.data));
      this.print = true;
    },
  },
  computed: {
    filteredChars() {
      // Si search está vacío
      if (!this.search) {
        return this.chars;
      }

      // Si search tiene algo...
      this.print = false;

      return this.chars.filter(
        (char) =>
          char.name.toLowerCase().includes(this.search.toLowerCase()) ||
          char.gender.toLowerCase().includes(this.search.toLowerCase()) ||
          char.status.toLowerCase().includes(this.search.toLowerCase()) ||
          char.species.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    api.getAll().then((response) => (this.chars = response.data.results));
  },
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

#box {
  margin: 1rem auto;
}

#box label {
  font-size: 1.2rem;
}

#box input {
  width: 200px;
}
</style>
