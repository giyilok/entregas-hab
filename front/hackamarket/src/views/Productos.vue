<template>
  <div>
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Productos" description="Listado de productos" />
    </div>
    <!--  Título de la pestaña -->

    <!--  Menú de navegación  -->
    <menucustom></menucustom>
    <!--  Menú de navegación  -->

    <!-- Barra de búsqueda filtrada -->
    <form>
      <div class="box">
        <label for="bySearch">Filtra el producto:</label>
        <input v-model="search" id="search" type="search" placeholder="Search" name="bySearch" />
        <!-- <button @click="filteredProducts">Find by ID</button> -->
      </div>
    </form>
    <!-- Barra de búsqueda-->

    <!-- CSS Loader -->
    <div v-show="print" class="loader">Loading...</div>
    <!-- CSS Loader -->

    <!-- Listado de productos -->
    <producto v-show="!print" :productos="filteredProducts" v-on:buy="buyItem"></producto>
    <!-- Listado de productos -->

    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import producto from "@/components/Producto.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Productos",
  components: {
    menucustom,
    footercustom,
    producto
  },
  data() {
    return {
      productos: [],
      print: true,
      empty: false,
      search: ""
    };
  },
  methods: {
    getProducts() {
      var self = this;
      // Hacemos la petición del listado a la API
      axios
        .get("http://localhost:3050/productos")
        .then(function(response) {
          self.productos = response.data;
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "No se encontraron productos en la BBDD",
            icon: "error",
            confirmButtonText: "Ok"
          });
        });
    },
    buyItem(index) {
      let producto = this.productos[index];
      // Al pulsar comprar se decrementa el stock en una unidad
      console.log(producto.stock);
      const stock = producto.stock--;
      console.log(producto.stock);
      // Si stock === 0, cambiamos el estado a 'no disponible'
      if (producto.stock === 0) {
        producto.estado = "no disponible";
      }
      // Actualizamos el producto en la vista
      this.productos[index] = producto;
      // Actualizmaos en la base de datos el estado y el stock actualizado
      axios
        .put("http://localhost:3050/productos/update/" + producto.id, {
          estado: producto.estado,
          stock: producto.stock
        })
        .then(function(response) {
          // Si todo fue bien imprimimos la confirmación del pedido
          Swal.fire({
            title: "¡Lo tienes!",
            text: "Ya estamos preparando tu pedido",
            icon: "success",
            confirmButtonText: "Ok"
          });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      // Se podría realizar una nueva cosulta para actualizar todos los datos
      // con this.getProducts();
    }
  },
  computed: {
    filteredProducts() {
      // Por defecto imprime el array de productos
      /* this.print = false; */

      // Si el input search está vacío
      if (!this.search) {
        return this.productos;
      }

      // Si search tiene algo...
      return this.productos.filter(
        producto =>
          producto.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
          producto.descripcion
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          producto.estado.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  // Hook created
  created() {
    // Obtiene la lista de productos
    this.getProducts();
    // Forzamos 2 segundos el loader spinner para que mole más
    setTimeout(() => {
      this.print = false;
    }, 2000);
  }
};
</script>

<style scoped>
/* form {
  margin: 120px auto 40px;
  display: flex;
  justify-content: center;
} */

/* label {
  font-size: 24px;
  margin-right: 1rem;
}

input {
  width: 250px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid lightslategrey;
  font-size: 1rem;
} */

/* button {
  display: inline-block;
  background: #ff2f56;
  border: #ff2f56;
  border-radius: 18px;
  color: white;
  padding: 9px 16px;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 12px 0;
  outline: none;
} */
</style>