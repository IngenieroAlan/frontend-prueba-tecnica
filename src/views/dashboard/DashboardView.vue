<script setup>
import { onMounted, ref } from "vue";
import "./styles.css";
import baseUrl from "../../api/api";
import router from "../../router";

const users = ref();
const isLoading = ref(true);

const getUsers = async () => {
  try {
    const resp = await fetch(baseUrl + "/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    if (data) {
      users.value = data;
      setTimeout(() => (isLoading.value = false), 1400);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleDetails = (userId) => {
  router.replace(`/user/${userId}`);
};
const handleEdit = (userId) => {
  router.replace(`/user/edit/${userId}`);
};
const handleDelete = async (userId) => {
  isLoading.value = true;
  try {
    await fetch(baseUrl + `/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    getUsers();
    setTimeout(() => (isLoading.value = false), 1400);
  } catch (error) {
    isLoading.value = false;

    console.error(error);
  }
};
const handleAdd = async () => {
  router.replace("/user/add");
};
const handleLogout = () => {
  localStorage.clear();
  router.replace("/");
};
onMounted(() => {
  isLoading.value = true;
  getUsers();
});
</script>
<template>
  <el-container class="container">
    <el-header class="header">
      <el-button
        link
        style="margin-right: 4px"
        @click="handleLogout"
      >
        Cerrar sesión
      </el-button>
    </el-header>
    <el-main class="content">
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="isLoading"
        empty-text="No hay usuarios para mostrar"
      >
        <el-table-column
          fixed
          prop="userName"
          label="Nombre de usuario"
          min-width="80"
        />
        <el-table-column
          prop="email"
          label="Correo electronico"
          min-width="80"
        />
        <el-table-column
          prop="registerDate"
          label="Fecha de registro"
          min-width="80"
        />
        <el-table-column
          fixed="right"
          label="Acciones"
          min-width="120"
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
              type="primary"
              size="small"
              @click="handleEdit(row.id)"
              >Editar</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row.id)"
              >Eliminar</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="width: 100%"
        class="btnAddUser"
        @click="handleAdd"
      >
        Agregar usuario
      </el-button>
    </el-main>
  </el-container>
</template>
