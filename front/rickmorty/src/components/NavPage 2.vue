<template>
  <div>
    <nav>
      <button @click="previousEvent">Previous</button>
      <p>Page {{ page }}</p>
      <button @click="nextEvent">Next</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavPage",
  props: {
    page: Number
  },
  methods: {
    nextEvent() {
      this.$emit("next");
    },
    previousEvent() {
      this.$emit("previous");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  margin-top: 2rem;
}

p {
  display: inline-block;
  color: #2fa2bc;
  font-weight: bold;
}

button {
  margin: auto 1rem;
  background: white;
  padding: 8px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #2fa2bc;
  color: #2fa2bc;
}
</style>
