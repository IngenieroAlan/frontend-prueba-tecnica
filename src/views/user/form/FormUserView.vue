<template>
  <el-card>
    <h1>{{ isEditMode ? "Editar Usuario" : "Agregar Usuario" }}</h1>
    <el-form
      :model="user"
      :rules="rules"
      ref="userForm"
    >
      <el-form-item
        label="Nombre de usuario"
        prop="username"
      >
        <el-input
          v-model="user.userName"
          placeholder="Nombre de usuario"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Correo electronico"
        prop="email"
      >
        <el-input
          v-model="user.email"
          placeholder="Correo electronico"
          type="email"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit"
        >
          {{ isEditMode ? "Guardar Cambios" : "Agregar Usuario" }}
        </el-button>
        <el-button @click="resetForm">Resetear</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import baseUrl from "../../../api/api";

const route = useRoute();
const router = useRouter();

const user = ref({
  userName: "",
  email: "",
  registerDate: new Date(),
});

const rules = {
  name: [
    { required: true, message: "El nombre es obligatorio", trigger: "blur" },
  ],
  email: [
    { required: true, message: "El correo es obligatorio", trigger: "blur" },
    { type: "email", message: "El correo no es válido", trigger: "blur" },
  ],
};

const userForm = ref(null);

//Dependiendo de si se obtiene un 'id' de las props de la ruta el valor de 'isEditMode'
//sera 'true' o 'false'
const isEditMode = computed(() => !!route.params.id);

//Obtenemos la info del usuario en caso de que se quiera editar
const getUser = async (id) => {
  if (isEditMode.value) {
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
        console.log(user.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const submit = () => {
  userForm.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditMode.value) {
          // Actualizar usuario
          await fetch(baseUrl + `/user/${route.params.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(user.value),
          });
        } else {
          // Crear nuevo usuario
          await fetch(baseUrl + "/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(user.value),
          });
        }
        ElMessage.success("Operación realizada con éxito");
        router.push("/home");
      } catch (error) {
        console.error(error);
        ElMessage.error("Hubo un error al realizar la operación");
      }
    } else {
      ElMessage.error("Por favor, corrige los errores en el formulario");
    }
  });
};

const resetForm = () => {
  userForm.value.resetFields();
};
onMounted(() => {
  getUser(route.params.id);
});
</script>
