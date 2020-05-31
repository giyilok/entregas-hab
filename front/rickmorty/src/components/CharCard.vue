<template>
  <div>
    <div class="container">
      <div v-for="char in chars" :key="char.id" class="card">
        <div class="imagen">
          <img :src="char.image" />
        </div>
        <p
          :class="{
            alivep: char.status === 'Alive',
            deadp: char.status === 'Dead',
            unknownp: char.status === 'unknown',
          }"
        >
          ID: {{ char.id }}
        </p>
        <h2>{{ char.name }}</h2>

        <div class="item-info">
          <p>Species: {{ char.species }}</p>
          <p>Gender: {{ char.gender }}</p>
          <p>Origin: {{ char.origin.name }}</p>
          <p>Last Known location: {{ char.location.name }}</p>
        </div>
        <p
          class="status"
          :class="{
            alive: char.status === 'Alive',
            dead: char.status === 'Dead',
            unknown: char.status === 'unknown',
          }"
        >
          Status: <strong>{{ char.status }}</strong>
        </p>
        <!-- <p>{{ char.origin.url }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharCard",
  props: {
    chars: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dead {
  background: rgb(211, 85, 85);
}

.alive {
  background: rgb(101, 220, 119);
}

.unknown {
  background: grey;
}

.deadp {
  color: rgb(211, 85, 85);
  font-weight: bolder;
}

.alivep {
  color: rgb(101, 220, 119);
  font-weight: bolder;
}

.unknownp {
  color: grey;
  font-weight: bolder;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 250px;
  border: 1px solid grey;
  margin: 1.5rem;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 auto 1rem;
}

.item-info {
  margin-bottom: 1rem;
  color: grey;
}

img {
  width: 100%;
  display: inline-block;
  object-fit: cover;
}

h2 {
}
.item-info {
  flex-grow: 1;
}

.status {
  color: white;
  font-size: 1.3rem;
  height: 60px;
  border-top: 1px solid grey;
  font-weight: bold;
  text-align: center;
  padding-top: 1rem;
}
</style>
