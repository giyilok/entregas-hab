<template>
  <div class="list">
    <div class="tag" v-for="tag in tags" :key="tag.id">
      <a :href="tag.url">
        <div class="tag-link">
          <p>{{ tag.name }}</p>
          <p>Taggings:</p>
          <p>{{ tag.taggings }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: Array,
  },
};
</script>

<style>
.tag-link {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 1rem;
  background-image: url("../assets/rock.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 170px;
  height: 170px;
  border-radius: 6px;
  border-color: lightslategrey;
}

.tag-link p:first-child {
  font-size: 22px;
  font-weight: 700;
  flex-grow: 1;
}

p {
  text-align: left;
  margin-left: 8px;
}

a {
  color: #ffffff;
  text-decoration: none;
}
</style>
