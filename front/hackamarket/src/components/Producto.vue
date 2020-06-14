<template>
  <div>
    <div class="productos" v-for="(producto, index) in productos" :key="producto.id">
      <img :src="producto.img" alt="Imagen" />
      <p>Nombre: {{producto.nombre}}</p>
      <p>Descripción: {{ producto.descripcion }}</p>
      <p
        :class="{red: producto.estado === 'no disponible', green: producto.estado === 'disponible'}"
      >{{ producto.estado }}</p>
      <!-- No se muestra en la tienda el stock de los productos
      <p>Stock: {{ producto.stock }}</p>-->
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
.productos {
  border: 1px solid blue;
  border-radius: 12px;
  width: 200px;
  padding: 10px;
  margin: 1rem auto;
  margin: o auto;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>