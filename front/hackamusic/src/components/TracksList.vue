<template>
  <div class="list">
    <div class="track" v-for="track in tracks" :key="track.id">
      <p>Top: {{ Number(track["@attr"].rank) + 1 }}</p>
      <img src="../assets/pearljam.jpg" alt="Portada albúm" />
      <div class="titles">
        <h3>Title: {{ track.name }}</h3>
        <p>Artist: {{ track.artist.name }}</p>
      </div>
      <p>Duration: {{ track.duration != 0 ? track.duration : "Unknown"}}</p>
      <p>Lyrics</p>
      <a :href="track.url">Listen</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tracks",
  props: {
    tracks: Array
  }
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
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid black;
  border-radius: 16px;
  margin: 10px 0;
  width: 80%;
  padding: 0 10px;
  background: lightslategrey;
  color: white;
}

.track > * {
  padding: 10px;
}

img {
  width: 60px;
  border-radius: 8px;
}

.titles {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}

.track a {
  border-radius: 12px;
  color: #ff2f56;
  background: lightgrey;
  font-weight: 700;
  padding: 4px 12px;
}
</style>
