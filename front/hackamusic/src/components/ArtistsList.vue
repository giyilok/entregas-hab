<template>
  <div>
    <div class="artist" v-for="(artist, index) in artists" :key="artist.id">
      <div class="image-container">
        <img src="../assets/singer.jpg" alt />
      </div>
      <h2>Ranking {{ index + 1 }}</h2>
      <p class="long-name">Name: {{ artist.name }}</p>
      <p>Listeners: {{ artist.listeners }}</p>
      <a :href="artist.url">More info</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Artists",
  props: {
    artists: Array
  }
};
</script>

<style scoped>
.artist {
  border: 1px solid lightslategrey;
  border-radius: 16px;
  width: 200px;
  margin: 1rem;
  background: lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*   box-shadow: -6px 11px 22px 1px rgba(181, 174, 181, 1);
 */
}

img {
  display: block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid lightslategrey;
  margin-top: 5px;
}

a {
  display: inline-block;
  color: #ff2f56;
  font-weight: bold;
  padding: 6px;
}

.long-name {
  flex-grow: 1;
}

h2,
p {
  padding: 4px;
}
</style>
