<script setup>
import { reactive } from "vue";
import { ElButton, ElContainer, ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import router from "../../router";
import "./styles.css";
import baseUrl from "../../api/api";

if (localStorage.getItem("token")) {
  router.replace("/home");
}
const form = reactive({
  username: "",
  email: "",
});

const onSubmit = async () => {
  try {
    const resp = await fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (data.isSuccess) {
      localStorage.setItem("token", data.token);
      router.replace("/home");
    } else {
      ElMessage.error("Error, las credenciales son incorrectas");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <el-container class="login-container">
    <el-main class="login-main">
      <el-card class="login-card">
        <el-icon
          size="50px"
          class="login-avatar"
        >
          <UserFilled />
        </el-icon>
        <el-form
          class="login-form"
          label-width="auto"
          :model="form"
        >
          <el-form-item
            prop="username"
            label="Nombre de usuario"
            :rules="[
              {
                required: true,
                message: 'El campo del nombre de usuario no puede estar vacio',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item
            prop="email"
            label="Correo electrónico"
            :rules="[
              {
                required: true,
                message: 'El campo del correo electrónico no puede estar vacio',
                trigger: 'blur',
              },
              {
                type: 'email',
                message: 'Por favor ingrese un correo electrónico válido',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item class="button">
            <el-button
              type="primary"
              @click="onSubmit"
            >
              Iniciar sesión
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
