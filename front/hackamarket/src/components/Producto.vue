<template>
  <div class="productos">
    <div class="producto" v-for="(producto, index) in productos" :key="producto.id">
      <img :src="producto.img" alt="Imagen" />
      <h2>{{producto.nombre}}</h2>
      <p>{{ producto.descripcion }}</p>
      <p
        :class="{red: producto.estado === 'no disponible', green: producto.estado === 'disponible'}"
      >{{ producto.estado }}</p>
      <p
        :class="{red: producto.stock === 0, green: producto.estado === 'disponible'}"
      >Stock: {{ producto.stock }}</p>
      <p>Precio: {{ producto.precio }}€</p>
      <br />
      <!-- Botón para comprar, no se muestra si el stock es cero -->
      <button v-show="producto.stock" @click="buyEvent(index)">Comprar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Producto",
  data() {
    return {
      index: null
    };
  },
  props: {
    productos: Array
  },
  methods: {
    buyEvent(index) {
      this.$emit("buy", index);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

.productos {
  margin: 25px auto 0;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
}

.producto {
  border: 1px solid blue;
  border-radius: 12px;
  width: 250px;
  margin: 1rem auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.red {
  color: red;
}

.green {
  color: green;
}

img {
  width: 100%;
  height: 200px;
}

button {
  width: 70px;
  padding: 4px 0;
  border: none;
  font-size: 14px;
  color: #42b983;
  background: white;
  border: 1px solid;
  border-radius: 18px;
  font-weight: 300;
  margin: 0 10px 1rem;
}

h2,
p {
  margin: 2px 1rem;
}

p:nth-child(3) {
  flex-grow: 1;
}
</style>