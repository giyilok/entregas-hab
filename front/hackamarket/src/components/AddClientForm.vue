<template>
  <div>
    <form>
      <h2>Añadir cliente</h2>
      <p v-show="required" class="required">Tienes datos aún por rellenar</p>

      <!-- Input para nombre -->
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" placeholder="Nombre del cliente" v-model="nombre" />
      <br />

      <!-- Input para apellido -->
      <label for="apellido">Apellido:</label>
      <input type="text" name="apellido" placeholder="Apellido del cliente" v-model="apellido" />
      <br />

      <!-- Input para ciudad -->
      <label for="ciudad">Ciudad:</label>
      <input type="text" name="ciudad" placeholder="Ciudad del cliente" v-model="ciudad" />

      <!-- Input para empresa -->
      <br />
      <label for="empresa">Empresa:</label>
      <input type="text" name="empresa" placeholder="Empresa del cliente" v-model="empresa" />
      <br />
      <button @click.prevent="addClient(nombre, apellido, ciudad, empresa)">Crear</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddClientForm",
  data() {
    return {
      nombre: "",
      apellido: "",
      ciudad: "",
      empresa: ""
    };
  },
  props: {
    required: Boolean
  },
  methods: {
    addClient(newNombre, newApellido, newCiudad, newEmpresa) {
      this.$emit("addclient", newNombre, newApellido, newCiudad, newEmpresa);
    }
  }
};
</script>

<style scoped>
p {
  color: red;
}

form {
  margin-top: 3rem;
}

input {
  margin: 8px auto;
}
</style>