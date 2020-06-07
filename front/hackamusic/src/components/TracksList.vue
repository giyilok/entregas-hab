<template>
  <div class="list">
    <div class="track" v-for="track in tracks" :key="track.id">
      <p>Ranking: {{ Number(track["@attr"].rank) + 1 }}</p>
      <img src="../assets/pearljam.jpg" alt="Portada albúm" />
      <div class="titles">
        <h3>Title: {{ track.name }}</h3>
        <p>Nombre: {{ track.artist.name }}</p>
      </div>
      <p>Duration: {{ track.duration }}</p>
      <p>Lyrics</p>
      <button>Listen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tracks",
  props: {
    tracks: Array,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}

.track {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 16px;
  margin: 10px 0;
  width: 80%;
  padding: 10px;
}

img {
  width: 50px;
}

.titles {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
