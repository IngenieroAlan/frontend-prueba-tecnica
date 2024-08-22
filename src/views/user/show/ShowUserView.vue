<script setup>
import { ref } from "vue";
import baseUrl from "../../../api/api";
import UserInfoCard from "../../../components/UserInfoCard.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const contacts = ref();
const user = ref();
const getContacts = async (id) => {
  //TODO:Ruta para obtener los contactos dependiendo del id del usuario
  try {
    const resp = await fetch(baseUrl + `/contact/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    if (data.isSuccess) {
      contacts.value = data;
      console.log(contacts.value);
    }
  } catch (error) {
    console.error(error);
  }
};
const getUser = async (id) => {
  //TODO:Ruta para obtener los contactos dependiendo del id del usuario
  try {
    const resp = await fetch(baseUrl + `/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    if (data.isSuccess) {
      user.value = data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
getContacts(route.params.id);
getUser(route.params.id);
console.log(user);
const handleDetails = (userId) => {
  //router.push(`/user/${userId}`);
  console.log(userId);
};
const handleEdit = (userId) => {
  console.log(userId);
};
</script>
<template>
  <el-container class="container">
    <el-header class="header"></el-header>
    <el-main class="content">
      <UserInfoCard :user="user" />
      <el-table
        :data="contacts"
        class="table"
        empty-text="El usuario no tiene contactos"
      >
        <el-table-column
          fixed
          prop="name"
          label="Nombre"
          min-width="60"
        />
        <el-table-column
          prop="email"
          label="Correo electronico"
          min-width="60"
        />
        <el-table-column
          prop="phone"
          label="Telefono"
          min-width="60"
        />
        <el-table-column
          prop="phone"
          label="Referencia"
          min-width="60"
        />
        <el-table-column
          fixed="right"
          label="Acciones"
          min-width="80"
        >
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDetails(row.id)"
            >
              Detalles
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleEdit(row.id)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="width: 100%"
        class="btnAddContact"
        @click="handleAdd"
      >
        Agregar contacto
      </el-button>
    </el-main>
  </el-container>
</template>

<style scoped>
.btnAddContact {
  border-radius: 0;
  border-width: 0;
}
</style>
