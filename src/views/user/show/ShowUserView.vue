<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import baseUrl from "../../../api/api";
import UserInfoCard from "../../../components/UserInfoCard.vue";
import router from "../../../router";

const route = useRoute();

const contacts = ref();
const user = ref();
const isLoading = ref(true);

const getContacts = async (userId) => {
  isLoading.value = true;
  try {
    const resp = await fetch(baseUrl + `/Contact/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    if (data.isSuccess) {
      contacts.value = data.data;
      isLoading.value = false;
    }
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
};
const getUser = async (id) => {
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
const handleDelete = async (id) => {
  isLoading.value = true;
  try {
    await fetch(baseUrl + `/Contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    getContacts(route.params.id);
    setTimeout(() => (isLoading.value = false), 1400);
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
};
const handleEdit = (id) => {
  router.replace(`/contact/edit/${id}`);
};
const handleAdd = async () => {
  router.replace("/contact/add");
};
const goBack = async () => {
  router.replace("/home");
};
</script>
<template>
  <el-container class="container">
    <el-header
      class="header"
      style="text-align: left"
    >
      <el-button
        link
        @click="goBack"
        ><el-icon size="38px"><Back /> </el-icon
      ></el-button>
    </el-header>
    <el-main class="content">
      <UserInfoCard :user="user" />
      <el-table
        :data="contacts"
        width="100%"
        empty-text="El usuario no tiene contactos"
        v-loading="isLoading"
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
          prop="phoneNumber"
          label="Telefono"
          min-width="60"
        />
        <el-table-column
          prop="address"
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
              @click="handleEdit(row.id)"
              >Editar</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row.id)"
            >
              Eliminar
            </el-button>
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
