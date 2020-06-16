<template>
  <div class="clients">
    <!--  Título de la pestaña -->
    <div>
      <vue-headful title="Clientes" description="Listado de clientes" />
    </div>
    <!--  Título de la pestaña -->

    <!--  Menú de navegación  -->
    <menucustom></menucustom>
    <!--  Menú de navegación  -->

    <div class="blank"></div>

    <!-- Listado de clientes -->
    <h2>Clientes de Hackamarket</h2>
    <h2>Listado 👇</h2>

    <!-- CSS Loader -->
    <div v-show="print" class="loader">Loading...</div>
    <!-- CSS Loader -->

    <div class="clientes" v-show="!print" v-for="(cliente, index) in clientes" :key="cliente.id">
      <p>ID: {{ cliente.id }}</p>
      <p>Nombre: {{ cliente.nombre }}</p>
      <p>Apellido: {{ cliente.apellido }}</p>
      <p>Ciudad: {{ cliente.ciudad }}</p>
      <p>Empresa: {{ cliente.empresa }}</p>
      <button @click="deleteClient(index)">Borrar</button>
      <button @click="openModal(cliente)">Editar</button>
    </div>
    <!-- Listado de clientes -->

    <!-- Modal para editar clientes -->
    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h2>Menú de edición:</h2>

        <label for="name">Nombre:</label>
        <input type="text" name="name" placeholder="Introduce el nombre" v-model="newName" />
        <br />

        <label for="lastname">Apellido:</label>
        <input
          type="text"
          name="lastname"
          placeholder="Introduce el apellido"
          v-model="newLastName"
        />
        <br />

        <label for="city">Ciudad:</label>
        <input type="text" name="city" placeholder="Introduce la ciudad" v-model="newCity" />
        <br />

        <label for="company">Empresa:</label>
        <input type="text" name="company" placeholder="Introduce la empresa" v-model="newCompany" />
        <br />

        <button @click="updateClient">Actualizar</button>
      </div>
    </div>
    <!-- Modal para editar clientes -->

    <!--  Footer  -->
    <footercustom class="footercustom"></footercustom>
    <!--  Footer  -->
  </div>
</template>

<script>
// @ is an alias to /src
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Clientes",
  components: {
    menucustom,
    footercustom
  },
  data() {
    return {
      // Array de clientes de la bd
      clientes: [],
      // Controla la visibilidad del modal
      modal: false,
      // Id del cliente a operar
      id: null,
      // Datos del cliente a actualizar
      newName: "",
      newLastName: "",
      newCity: "",
      newCompany: "",
      print: true
    };
  },
  methods: {
    getClients() {
      var self = this;
      axios
        .get("http://localhost:3050/clientes")
        .then(function(response) {
          console.log(response);
          self.clientes = response.data;
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "No se encontraron clientes en la BBDD",
            icon: "error",
            confirmButtonText: "Ok"
          });
        });
    },
    // Función para borrar clientes
    deleteClient(index) {
      let data = this.clientes[index].id;
      axios
        .delete("http://localhost:3050/clientes/delete/" + data)
        .then(function(response) {
          console.log(response);

          location.reload();

          Swal.fire({
            title: "Eliminado!",
            text: "Cliente borrado con éxito",
            icon: "success",
            confirmButtonText: "Ok"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // Función para actualizar un cliente
    updateClient() {
      var self = this;
      axios
        .put("http://localhost:3050/clientes/update/" + self.id, {
          nombre: self.newName,
          apellido: self.newLastName,
          ciudad: self.newCity,
          empresa: self.newCompany
        })
        .then(function(response) {
          location.reload();
          Swal.fire({
            title: "Actualizado!",
            text: "Cliente actualizado con éxito",
            icon: "success",
            confirmButtonText: "Ok"
          });
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Error, no se ha podido actualizar el cliente",
            icon: "error",
            confirmButtonText: "Ok"
          });
        });
    },
    openModal(cliente) {
      this.modal = true;
      this.id = cliente.id;
      this.newName = cliente.nombre;
      this.newLastName = cliente.apellido;
      this.newCity = cliente.ciudad;
      this.newCompany = cliente.empresa;
    },
    closeModal() {
      this.modal = false;
      this.updateClient();
    }
  },
  created() {
    this.getClients();
    setTimeout(() => {
      this.print = false;
    }, 2000);
  }
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}

.clientes {
  border: 1px solid blue;
  border-radius: 12px;
  width: 200px;
  padding: 10px;
  margin: 1rem auto;
}

.footercustom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
}

.blank {
  width: 100%;
  height: 80px;
}

.loader {
  margin: 6rem auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

@keyframes modal-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

button {
  margin: 0 0.5rem;
}
</style>