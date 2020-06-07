<template>
  <div>
    <p>
      Designed by <span>{{ name }}</span> in A Coruña, 2020
    </p>
  </div>
</template>

<script>
export default {
  name: "FooterCustom",
  data() {
    return {
      name: "Giyi",
    };
  },
};
</script>

<style scoped>
p {
  font-size: 1rem;
  margin: 3rem auto 1rem;
}

span {
  color: #ff2f56;
}
</style>
